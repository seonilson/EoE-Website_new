"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogData";

// ── Types ─────────────────────────────────────────────────────
type BlockType = "intro" | "h2" | "p" | "quote" | "list";
type Tab = "write" | "manage" | "gallery" | "events-photos" | "events-slide" | "popup";
type ManageView = "list" | "edit";

const DRAFT_KEY = "cc_admin_blog_draft";

interface FaqItem { id: string; question: string; answer: string; }
interface Block { id: string; type: BlockType; heading?: string; content: string; items?: string[]; }
interface FormData { title: string; excerpt: string; category: string; coverImage: string; metaKeywords: string; author: string; authorRole: string; readTime: string; slug: string; metaTitle: string; metaDescription: string; blocks: Block[]; faqs: FaqItem[]; }
interface PopupConfig { announcementEnabled: boolean; announcementImage: string; announcementLink: string; announcementAlt: string; }
interface GalleryItem { id: string; type: string; category: string; title: string; desc: string; src: string; }
interface EventPhoto  { id: string; title: string; desc: string; src: string; }
interface EventSlide  { badge: string; title: string; dateLocation: string; description: string; buttonText: string; buttonLink: string; }

const COUNTRIES = ["UK","Canada","USA","Australia","Singapore","Cyprus","Dubai","Mauritius","Russia","Germany","France","Ireland","Other"];
const DEFAULT_CATEGORIES = ["Visa Guides","Policy Updates","Destinations","Scholarships","Student Life","Career Advice","University News"];

let _id = 1;
const uid = () => String(_id++);
const faqUid = () => `faq_${uid()}`;

const emptyFaq = (): FaqItem => ({ id: faqUid(), question: "", answer: "" });
const emptyForm = (): FormData => ({
  title: "", excerpt: "", category: "Visa Guides",
  coverImage: "", metaKeywords: "",
  author: "Edification Team", authorRole: "Editorial", readTime: "5 min read",
  slug: "", metaTitle: "", metaDescription: "",
  blocks: [makeBlock("intro"), makeBlock("h2"), makeBlock("h2"), makeBlock("h2"), makeBlock("h2")],
  faqs: [],
});

function makeBlock(type: BlockType): Block {return { id: uid(), type, heading: type === "h2" ? "" : undefined, content: "", items: type === "list" ? ["","",""] : undefined };}
function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim(); }

const BLOCK_META: Record<BlockType,{label:string;color:string;desc:string}> = {
  intro: {label:"Intro Paragraph",color:"#022C45",desc:"Bold opening paragraph"},
  h2:    {label:"Section",        color:"#F16101",desc:"Heading + paragraph pair"},
  quote: {label:"Highlight Quote",color:"#07CBEB",desc:"Cyan callout box"},
  list:  {label:"Checklist",      color:"#C9A24D",desc:"Orange-tick bullet list"},
  p:     {label:"Plain Paragraph",color:"#6B7280",desc:"Extra paragraph"},
};

function postToForm(post: BlogPost): FormData {
  const blocks: Block[] = post.content.map((s, idx) => {
    if (s.type==="h2")   return {id:uid(),type:"h2",heading:s.content||"",content:"",items:undefined};
    if (s.type==="list") return {id:uid(),type:"list",content:"",items:s.items||[],heading:undefined};
    const blockType = idx===0 && s.type==="p" ? "p" : (s.type as BlockType);
    return {id:uid(),type:blockType,content:s.content||"",heading:undefined,items:undefined};
  });
  return {
    title:post.title, excerpt:post.excerpt, category:post.category,
    coverImage:post.coverImage, metaKeywords:post.metaKeywords,
    author:post.author, authorRole:post.authorRole, readTime:post.readTime,
    slug: post.slug || "",
    metaTitle: (post as any).metaTitle || "",
    metaDescription: (post as any).metaDescription || "",
    blocks: blocks.length ? blocks : [makeBlock("intro"),makeBlock("h2")],
    faqs: (post as any).faqs || [],
  };
}

// ── Tab config ────────────────────────────────────────────────
const TABS: {id: Tab; label: string; icon: string}[] = [
  {id:"write",         label:"Write Blog",     icon:"✍"},
  {id:"manage",        label:"Manage Blogs",   icon:"📋"},
  {id:"gallery",       label:"Testimonials",   icon:"🎓"},
  {id:"events-photos", label:"Event Photos",   icon:"📸"},
  {id:"events-slide",  label:"Hero Event",     icon:"🎯"},
  {id:"popup",         label:"Popup Modal",    icon:"💬"},
];

// ═══════════════════════════════════════════════════════════════
export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("write");
  
  // ── Blog Write state ─────────────────────────────────────────
  const [form, setForm]               = useState<FormData>(emptyForm());
  const [addMenu, setAddMenu]         = useState(false);
  const [preview, setPreview]         = useState(false);
  const [writeStatus, setWriteStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [writeMsg, setWriteMsg]       = useState("");
  const [publishedSlug, setPublishedSlug] = useState("");
  const [draftRestored, setDraftRestored] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  // ── Category state ───────────────────────────────────────────
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditAddCategory, setShowEditAddCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [editCatDropdownOpen, setEditCatDropdownOpen] = useState(false);
  const categories = [...DEFAULT_CATEGORIES, ...customCategories];

  // Derive custom categories from existing blogs (no localStorage — works across
  const refreshCategoriesFromPosts = () => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then((data: BlogPost[]) => {
        const used = Array.from(new Set(data.map(p => p.category)));
        const custom = used.filter(c => !DEFAULT_CATEGORIES.includes(c));
        setCustomCategories(custom);
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshCategoriesFromPosts();
  }, []);

  // ── Blog Manage state ────────────────────────────────────────
  const [posts, setPosts]             = useState<BlogPost[]>([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [manageView, setManageView]   = useState<ManageView>("list");
  const [editPost, setEditPost]       = useState<BlogPost|null>(null);
  const [editForm, setEditForm]       = useState<FormData>(emptyForm());
  const [editStatus, setEditStatus]   = useState<"idle"|"loading"|"success"|"error">("idle");
  const [editMsg, setEditMsg]         = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string|null>(null);
  const [deleteStatus, setDeleteStatus]   = useState<Record<string,"loading"|"done">>({});
  const [blogSearch, setBlogSearch]   = useState("");
  const [editAddMenu, setEditAddMenu] = useState(false);

  // ── Gallery state ────────────────────────────────────────────
  const [galleryItems, setGalleryItems]   = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryDeleteConfirm, setGalleryDeleteConfirm] = useState<string|null>(null);
  const [galleryDeleteFile, setGalleryDeleteFile] = useState(true);
  const [newGallery, setNewGallery]   = useState({type:"image",category:"UK",title:"",desc:"Visa Approved",src:""});
  const [galleryAddStatus, setGalleryAddStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [galleryAddMsg, setGalleryAddMsg] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadProgress, setGalleryUploadProgress] = useState("");

  // ── Event Photos state ───────────────────────────────────────
  const [eventPhotos, setEventPhotos] = useState<EventPhoto[]>([]);
  const [eventPhotoLoading, setEventPhotoLoading] = useState(false);
  const [eventDeleteConfirm, setEventDeleteConfirm] = useState<string|null>(null);
  const [eventDeleteFile, setEventDeleteFile] = useState(true);
  const [newEvent, setNewEvent]       = useState({title:"",desc:"Edification Overseas Seminar",src:""});
  const [eventAddStatus, setEventAddStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [eventAddMsg, setEventAddMsg] = useState("");
  const [eventUploading, setEventUploading] = useState(false);
  const [eventUploadProgress, setEventUploadProgress] = useState("");

  // ── Event Slide state ────────────────────────────────────────
  const [slide, setSlide] = useState<EventSlide>({badge:"",title:"",dateLocation:"",description:"",buttonText:"",buttonLink:""});
  const [slideLoading, setSlideLoading] = useState(false);
  const [slideStatus, setSlideStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [slideMsg, setSlideMsg]       = useState("");

  // ── Popup state ──────────────────────────────────────────────
  const [popupConfig, setPopupConfig]     = useState<PopupConfig>({announcementEnabled:false,announcementImage:"",announcementLink:"/contact",announcementAlt:"Special Offer"});
  const [popupStatus, setPopupStatus]     = useState<"idle"|"loading"|"success"|"error">("idle");
  const [popupMsg, setPopupMsg]           = useState("");
  const [popupUploading, setPopupUploading] = useState(false);

  // ── Data loaders ─────────────────────────────────────────────
  useEffect(() => { if (tab==="manage")        loadPosts(); },       [tab]);
  useEffect(() => { if (tab==="gallery")       loadGallery(); },     [tab]);
  useEffect(() => { if (tab==="events-photos") loadEventPhotos(); }, [tab]);
  useEffect(() => { if (tab==="events-slide")  loadSlide(); },       [tab]);
  useEffect(() => { if (tab==="popup")         loadPopup(); },        [tab]);

  const loadPopup = () => {
    fetch("/api/popup").then(r=>r.json()).then((d:PopupConfig)=>setPopupConfig(d)).catch(()=>{});
  };
  const loadPosts = () => {
    setManageLoading(true);
    fetch("/api/blogs").then(r=>r.json()).then((d:BlogPost[])=>{setPosts(d);setManageLoading(false);}).catch(()=>setManageLoading(false));
  };
  const loadGallery = () => {
    setGalleryLoading(true);
    fetch("/api/gallery").then(r=>r.json()).then((d:GalleryItem[])=>{setGalleryItems(d);setGalleryLoading(false);}).catch(()=>setGalleryLoading(false));
  };
  const loadEventPhotos = () => {
    setEventPhotoLoading(true);
    fetch("/api/events-photos").then(r=>r.json()).then((d:EventPhoto[])=>{setEventPhotos(d);setEventPhotoLoading(false);}).catch(()=>setEventPhotoLoading(false));
  };
  const loadSlide = () => {
    setSlideLoading(true);
    fetch("/api/events-slide").then(r=>r.json()).then((d:EventSlide)=>{setSlide(d);setSlideLoading(false);}).catch(()=>setSlideLoading(false));
  };

  // ── Blog form helpers ─────────────────────────────────────────
  const setField = (k: keyof FormData, v: any) => setForm(f=>({...f,[k]:v}));
  const setEditField = (k: keyof FormData, v: any) => setEditForm(f=>({...f,[k]:v}));

  const blockHelpers = (setter: React.Dispatch<React.SetStateAction<FormData>>) => ({
    update:     (id:string, patch:Partial<Block>) => setter(f=>({...f,blocks:f.blocks.map(b=>b.id===id?{...b,...patch}:b)})),
    updateItem: (id:string,i:number,val:string)   => setter(f=>({...f,blocks:f.blocks.map(b=>{if(b.id!==id)return b;const items=[...(b.items||[])];items[i]=val;return{...b,items};})})),
    addItem:    (id:string)                        => setter(f=>({...f,blocks:f.blocks.map(b=>b.id===id?{...b,items:[...(b.items||[]),""]}: b)})),
    removeItem: (id:string,i:number)               => setter(f=>({...f,blocks:f.blocks.map(b=>b.id!==id?b:{...b,items:(b.items||[]).filter((_,idx)=>idx!==i)})})),
    add:        (type:BlockType)                   => { setter(f=>({...f,blocks:[...f.blocks,makeBlock(type)]})); setAddMenu(false); },
    remove:     (id:string)                        => setter(f=>({...f,blocks:f.blocks.filter(b=>b.id!==id)})),
    move:       (id:string,dir:-1|1)               => setter(f=>{const arr=[...f.blocks];const i=arr.findIndex(b=>b.id===id);const j=i+dir;if(j<0||j>=arr.length)return f;[arr[i],arr[j]]=[arr[j],arr[i]];return{...f,blocks:arr};}),
  });

  // ── FAQ helpers ───────────────────────────────────────────────
  const faqHelpers = (setter: React.Dispatch<React.SetStateAction<FormData>>) => ({
    add:    ()                              => setter(f=>({...f,faqs:[...f.faqs,emptyFaq()]})),
    remove: (id:string)                    => setter(f=>({...f,faqs:f.faqs.filter(fq=>fq.id!==id)})),
    update: (id:string,patch:Partial<FaqItem>) => setter(f=>({...f,faqs:f.faqs.map(fq=>fq.id===id?{...fq,...patch}:fq)})),
    move:   (id:string,dir:-1|1)          => setter(f=>{const arr=[...f.faqs];const i=arr.findIndex(fq=>fq.id===id);const j=i+dir;if(j<0||j>=arr.length)return f;[arr[i],arr[j]]=[arr[j],arr[i]];return{...f,faqs:arr};}),
  });

  const wH = blockHelpers(setForm);
  const eH = blockHelpers(setEditForm);
  const wFaq = faqHelpers(setForm);
  const eFaq = faqHelpers(setEditForm);

  const wordCount = (f:FormData) => f.blocks.reduce((acc,b)=>{const w=(s:string)=>s.split(/\s+/).filter(Boolean).length;return acc+w(b.content)+(b.items||[]).reduce((a,s)=>a+w(s),0);},0);

  const checks = (f:FormData) => [
    {label:"Cover image path added",            done:!!f.coverImage},
    {label:"Title written (20+ chars)",          done:f.title.length>=20},
    {label:"Excerpt added (40+ chars)",          done:f.excerpt.length>=40},
    {label:"At least 3 sections added",          done:f.blocks.filter(b=>b.type==="h2").length>=3},
    {label:"Meta title (Max 60 chars)",          done: f.metaTitle.trim().length>0 && f.metaTitle.length<=60},
    {label:"Meta description (Max 165 chars)",   done: f.metaDescription.trim().length>0 && f.metaDescription.length<=165},
    {label:"Meta keywords added (5+ terms)",     done: f.metaKeywords.split(",").filter(k=>k.trim()).length>=3},
  ];

  const writeChecks = checks(form);    const writeReady = writeChecks.every(c=>c.done);
  const editChecks  = checks(editForm); const editReady  = editChecks.every(c=>c.done);
  const wc = wordCount(form); const wcPct = Math.min((wc/600)*100,100);
  const wcColor = wc<400?"#F16101":wc<600?"#C9A24D":"#22c55e";

  // ── Blog Publish ──────────────────────────────────────────────
  const handlePublish = async () => {
    if (!writeReady){setWriteStatus("error");setWriteMsg("Complete all checklist items first.");return;}
    setWriteStatus("loading");setWriteMsg("");
    try{
      const res=await fetch("/api/admin/publish",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({form})});
      const data=await res.json();
      if(data.success){
        setWriteStatus("success");setPublishedSlug(data.slug);setWriteMsg(data.message);
        refreshCategoriesFromPosts();
         try{ localStorage.removeItem(DRAFT_KEY); }catch{} 
      }
      else{setWriteStatus("error");setWriteMsg(data.message||"Something went wrong.");}
    }catch{setWriteStatus("error");setWriteMsg("Network error.");}
  };
  const handleReset = () => {setForm(emptyForm());setWriteStatus("idle");setWriteMsg("");setPublishedSlug("");  try{ localStorage.removeItem(DRAFT_KEY); }catch{} };

  // ── Blog Save Edit ────────────────────────────────────────────
  const handleSaveEdit = async () => {
    if(!editReady){setEditStatus("error");setEditMsg("Complete all checklist items.");return;}
    if(!editPost)return;
    setEditStatus("loading");setEditMsg("");
    try{
      const res=await fetch("/api/admin/edit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug:editPost.slug,form:editForm})});
      const data=await res.json();
      if(data.success){
        setEditStatus("success");setEditMsg("Post updated!");loadPosts();
        refreshCategoriesFromPosts();
      }
      else{setEditStatus("error");setEditMsg(data.message||"Error.");}
    }catch{setEditStatus("error");setEditMsg("Network error.");}
  };

  // ── Blog Delete ───────────────────────────────────────────────
  const handleBlogDelete = async (slug:string) => {
    setDeleteStatus(s=>({...s,[slug]:"loading"}));
    try{
      const res=await fetch("/api/admin/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug})});
      const data=await res.json();
      if(data.success){setDeleteStatus(s=>({...s,[slug]:"done"}));setPosts(p=>p.filter(b=>b.slug!==slug));refreshCategoriesFromPosts();}
    }catch{}
    setDeleteConfirm(null);
  };
  const openEdit = (post:BlogPost) => {setEditPost(post);setEditForm(postToForm(post));setEditStatus("idle");setEditMsg("");setEditAddMenu(false);setManageView("edit");};
  const filteredPosts = posts.filter(p=>p.title.toLowerCase().includes(blogSearch.toLowerCase())||p.category.toLowerCase().includes(blogSearch.toLowerCase()));

  // ── Upload helper ─────────────────────────────────────────────
  const uploadFile = async (file:File, folder:string, onProgress:(msg:string)=>void, onDone:(path:string)=>void, onError:(msg:string)=>void) => {
    onProgress(`Uploading ${file.name} (${(file.size/1024/1024).toFixed(1)}MB)...`);
    const fd = new FormData(); fd.append('file',file); fd.append('folder',folder);
    try{const res=await fetch('/api/admin/upload',{method:'POST',body:fd});const data=await res.json();
      if(data.success){onDone(data.path);onProgress('');}else{onError(data.message||'Upload failed.');onProgress('');}
    }catch{onError('Network error during upload.');onProgress('');}
  };

  // ── Gallery Add/Delete ────────────────────────────────────────
  const handleGalleryAdd = async () => {
    if(!newGallery.src.trim()){setGalleryAddStatus("error");setGalleryAddMsg("File path is required.");return;}
    setGalleryAddStatus("loading");
    try{const res=await fetch("/api/admin/gallery",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newGallery)});const data=await res.json();
      if(data.success){setGalleryAddStatus("success");setGalleryAddMsg("Added!");setNewGallery({type:"image",category:"UK",title:"",desc:"Visa Approved",src:""});loadGallery();}
      else{setGalleryAddStatus("error");setGalleryAddMsg(data.message||"Error.");}
    }catch{setGalleryAddStatus("error");setGalleryAddMsg("Network error.");}
  };
  const handleGalleryDelete = async (id:string) => {
    try{await fetch("/api/admin/gallery",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,deleteFile:galleryDeleteFile})});setGalleryItems(g=>g.filter(i=>i.id!==id));}catch{}
    setGalleryDeleteConfirm(null);
  };

  // ── Event Photos ──────────────────────────────────────────────
  const handleEventAdd = async () => {
    if(!newEvent.src.trim()){setEventAddStatus("error");setEventAddMsg("File path is required.");return;}
    setEventAddStatus("loading");
    try{const res=await fetch("/api/admin/events-photos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newEvent)});const data=await res.json();
      if(data.success){setEventAddStatus("success");setEventAddMsg("Photo added!");setNewEvent({title:"",desc:"Edification Overseas Seminar",src:""});loadEventPhotos();}
      else{setEventAddStatus("error");setEventAddMsg(data.message||"Error.");}
    }catch{setEventAddStatus("error");setEventAddMsg("Network error.");}
  };
  const handleEventDelete = async (id:string) => {
    try{await fetch("/api/admin/events-photos",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,deleteFile:eventDeleteFile})});setEventPhotos(e=>e.filter(i=>i.id!==id));}catch{}
    setEventDeleteConfirm(null);
  };

  // ── Event Slide Save ──────────────────────────────────────────
  const handleSaveSlide = async () => {
    if(!slide.title.trim()){setSlideStatus("error");setSlideMsg("Event title is required.");return;}
    setSlideStatus("loading");setSlideMsg("");
    try{const res=await fetch("/api/admin/events-slide",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(slide)});const data=await res.json();
      if(data.success){setSlideStatus("success");setSlideMsg("Hero event updated! Visible on homepage immediately.");}
      else{setSlideStatus("error");setSlideMsg(data.message||"Error.");}
    }catch{setSlideStatus("error");setSlideMsg("Network error.");}
  };

  // ── Popup Save ────────────────────────────────────────────────
  const handleSavePopup = async () => {
    setPopupStatus("loading");setPopupMsg("");
    try{const res=await fetch("/api/admin/popup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(popupConfig)});const data=await res.json();
      if(data.success){setPopupStatus("success");setPopupMsg("Popup settings saved! Changes are live immediately.");}
      else{setPopupStatus("error");setPopupMsg(data.message||"Error.");}
    }catch{setPopupStatus("error");setPopupMsg("Network error.");}
  };

  // ── Category handlers ────────────────────────────────────────
  const handleAddCategory = (isEdit: boolean) => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    if (!DEFAULT_CATEGORIES.includes(trimmed) && !customCategories.includes(trimmed)) { setCustomCategories(c => [...c, trimmed]);}
    if (isEdit) { setEditField("category", trimmed); setShowEditAddCategory(false); setEditCatDropdownOpen(false); }
    else { setField("category", trimmed); setShowAddCategory(false); setCatDropdownOpen(false); }
    setNewCategoryInput("");
  };

  const handleRemoveCategory = (cat: string, isEdit: boolean) => {
    setCustomCategories(c => c.filter(x => x !== cat));
    if (isEdit && editForm.category === cat) setEditField("category", DEFAULT_CATEGORIES[0]);
    if (!isEdit && form.category === cat) setField("category", DEFAULT_CATEGORIES[0]);
  };

  // helper function for /n space for paragraph
const formatPreviewContent = (text = "") =>
  text
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br />")
    .replace(
      /href="([^"]*)"/g,
      'href="$1" style="color:#F16101;text-decoration:underline;"'
    );

// Save Blog as Draft function
useEffect(() => {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) { const parsed = JSON.parse(saved);
      if (parsed?.title || parsed?.excerpt || parsed?.blocks?.some((b:Block)=>b.content||b.heading)) { setShowDraftBanner(true);}
    }
  } catch {}
}, []);

// Save Blog as Draft function Auto Save
useEffect(() => {
  if (tab !== "write" || preview) return;
  const hasContent = form.title || form.excerpt || form.blocks.some(b => b.content || b.heading);
  if (!hasContent) return;
  const timer = setTimeout(() => {
    try {localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, 1500);
  return () => clearTimeout(timer);
}, [form, tab, preview]);

    
  // ── Render: Category Dropdown ─────────────────────────────────
  const renderCategoryDropdown = (currentValue: string, isEdit: boolean, isOpen: boolean, setIsOpen: (v:boolean)=>void) => (
    <div style={{position:"relative"}}>
      <label className="lbl">Category</label>
      <button type="button" onClick={()=>setIsOpen(!isOpen)}
        style={{width:"100%",padding:"10px 13px",border:"1.5px solid rgba(2,44,69,0.1)",borderRadius:"9px",background:"#fff",fontSize:"14px",color:"#022C45",fontFamily:"inherit",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span>{currentValue}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transform:isOpen?"rotate(180deg)":"none",transition:"transform .2s"}}><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      {isOpen && (
        <>
          <div onClick={()=>{setIsOpen(false);if(isEdit)setShowEditAddCategory(false);else setShowAddCategory(false);}} style={{position:"fixed",inset:0,zIndex:40}}/>
          <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",borderRadius:"12px",border:"1px solid rgba(2,44,69,0.1)",boxShadow:"0 12px 32px rgba(2,44,69,0.14)",zIndex:50,overflow:"hidden",maxHeight:"300px",overflowY:"auto"}}>
            {DEFAULT_CATEGORIES.map(c=>(
              <button key={c} type="button" onClick={()=>{if(isEdit)setEditField("category",c);else setField("category",c);setIsOpen(false);}}
                style={{width:"100%",display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",border:"none",background:currentValue===c?"rgba(241,97,1,0.06)":"transparent",cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:"13px",fontWeight:currentValue===c?700:500,color:currentValue===c?"#F16101":"#022C45"}}
                onMouseEnter={e=>{if(currentValue!==c)(e.currentTarget as HTMLButtonElement).style.background="rgba(2,44,69,0.03)";}}
                onMouseLeave={e=>{if(currentValue!==c)(e.currentTarget as HTMLButtonElement).style.background="transparent";}}>
                {currentValue===c&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                {c}
              </button>
            ))}

            {customCategories.length>0&&(<div style={{borderTop:"1px solid rgba(2,44,69,0.06)",padding:"8px 14px 4px"}}> <span style={{fontSize:"10px",fontWeight:800,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.5px"}}>Custom</span></div>)}
            {customCategories.map(c=>(
              <div key={c} style={{display:"flex",alignItems:"center",background:currentValue===c?"rgba(241,97,1,0.06)":"transparent"}}
                onMouseEnter={e=>{if(currentValue!==c)(e.currentTarget as HTMLDivElement).style.background="rgba(2,44,69,0.03)";}}
                onMouseLeave={e=>{if(currentValue!==c)(e.currentTarget as HTMLDivElement).style.background="transparent";}}>
                <button type="button" onClick={()=>{if(isEdit)setEditField("category",c);else setField("category",c);setIsOpen(false);}}
                  style={{flex:1,display:"flex",alignItems:"center",gap:"8px",padding:"10px 0 10px 14px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"inherit",textAlign:"left",fontSize:"13px",fontWeight:currentValue===c?700:500,color:currentValue===c?"#F16101":"#022C45"}}>
                  {currentValue===c&&<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  {c}
                </button>
                <button type="button" onClick={()=>handleRemoveCategory(c,isEdit)} title="Remove category"
                  style={{width:"28px",height:"28px",marginRight:"8px",flexShrink:0,borderRadius:"6px",border:"none",background:"transparent",cursor:"pointer",color:"#9CA3AF",display:"flex",alignItems:"center",justifyContent:"center"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(239,68,68,0.1)";(e.currentTarget as HTMLButtonElement).style.color="#ef4444";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="transparent";(e.currentTarget as HTMLButtonElement).style.color="#9CA3AF";}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}

            {/* Fixed Add Category Button at bottom of dropdown */}
            <div style={{borderTop:"1px solid rgba(2,44,69,0.08)",padding:"8px",background:"#fff"}}>
              {(isEdit ? showEditAddCategory : showAddCategory) ? (
                <div style={{display:"flex",gap:"6px"}}>
                  <input className="ai" placeholder="New category name..." value={newCategoryInput}
                    onChange={e=>setNewCategoryInput(e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();handleAddCategory(isEdit);}}}
                    style={{flex:1,fontSize:"13px",padding:"8px 10px"}} autoFocus/>
                  <button onClick={()=>handleAddCategory(isEdit)}
                    style={{padding:"0 12px",borderRadius:"8px",border:"none",background:"#F16101",color:"#fff",fontWeight:700,fontSize:"13px",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                    Save
                  </button>
                  <button onClick={()=>{if(isEdit)setShowEditAddCategory(false);else setShowAddCategory(false);setNewCategoryInput("");}}
                    style={{padding:"0 10px",borderRadius:"8px",border:"1px solid rgba(2,44,69,0.15)",background:"#fff",color:"#6B7280",fontWeight:700,fontSize:"13px",cursor:"pointer",flexShrink:0}}>
                    ✕
                  </button>
                </div>
              ) : (
                <button type="button"
                  onClick={()=>{if(isEdit)setShowEditAddCategory(true);else setShowAddCategory(true);}}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",border:"1.5px dashed rgba(241,97,1,0.4)",borderRadius:"8px",background:"rgba(241,97,1,0.03)",cursor:"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:700,color:"#F16101",transition:"all .2s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(241,97,1,0.08)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(241,97,1,0.03)";}}>
                  <div style={{width:"22px",height:"22px",borderRadius:"50%",background:"#F16101",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                  Add New Category
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ── Render: Block Editor ──────────────────────────────────────
  const renderBlockEditor = (f:FormData, helpers:ReturnType<typeof blockHelpers>, showAdd:boolean, setShowAdd:(v:boolean)=>void) => (
    <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"20px",marginBottom:"16px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
        <p style={{fontSize:"13px",fontWeight:800,color:"#022C45",textTransform:"uppercase",letterSpacing:"1px",margin:0}}>Content Blocks</p>
        <span style={{fontSize:"12px",color:"#9CA3AF",fontWeight:600}}>{f.blocks.length} blocks</span>
      </div>
      {f.blocks.map((block,idx)=>{const meta=BLOCK_META[block.type];return(
        <div key={block.id} style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,0.08)",borderLeft:`3px solid ${meta.color}`,padding:"18px 20px",marginBottom:"14px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{padding:"3px 8px",borderRadius:"5px",background:`${meta.color}12`}}><span style={{fontSize:"10px",fontWeight:800,color:meta.color,textTransform:"uppercase",letterSpacing:"0.5px"}}>{meta.label}</span></div>
              <span style={{fontSize:"11px",color:"#9CA3AF"}}>{meta.desc}</span>
            </div>
            <div style={{display:"flex",gap:"4px"}}>
              <button onClick={()=>helpers.move(block.id,-1)} disabled={idx===0} style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(2,44,69,0.1)",background:"transparent",cursor:idx===0?"not-allowed":"pointer",color:"#6B7280",fontSize:"13px",opacity:idx===0?0.3:1}}>↑</button>
              <button onClick={()=>helpers.move(block.id,1)} disabled={idx===f.blocks.length-1} style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(2,44,69,0.1)",background:"transparent",cursor:idx===f.blocks.length-1?"not-allowed":"pointer",color:"#6B7280",fontSize:"13px",opacity:idx===f.blocks.length-1?0.3:1}}>↓</button>
              <button onClick={()=>helpers.remove(block.id)} style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(239,68,68,0.2)",background:"transparent",cursor:"pointer",color:"#ef4444",fontSize:"13px"}}>×</button>
            </div>
          </div>
          {(block.type==="intro"||block.type==="p")&&(<div><label className="lbl">{block.type==="intro"?"Opening Paragraph":"Paragraph"}</label><textarea className="at" rows={4} value={block.content} onChange={e=>helpers.update(block.id,{content:e.target.value})} placeholder="Write content..."/><p style={{fontSize:"11px",color:"#9CA3AF",margin:"4px 0 0"}}>{block.content.split(/\s+/).filter(Boolean).length} words</p></div>)}
          {block.type==="h2"&&(<div><div style={{marginBottom:"10px"}}><label className="lbl">Section Heading</label><input className="ai" value={block.heading||""} onChange={e=>helpers.update(block.id,{heading:e.target.value})} placeholder="Section heading..."/></div><label className="lbl">Content</label><textarea className="at" rows={5} value={block.content} onChange={e=>helpers.update(block.id,{content:e.target.value})} placeholder="Write 100-150 words..."/><p style={{fontSize:"11px",color:"#9CA3AF",margin:"4px 0 0"}}>{block.content.split(/\s+/).filter(Boolean).length} words</p></div>)}
          {block.type==="quote"&&(<div><label className="lbl">Quote / Highlight</label><textarea className="at" rows={3} value={block.content} onChange={e=>helpers.update(block.id,{content:e.target.value})} placeholder="Key stat or tip..."/><div style={{marginTop:"10px",padding:"14px 16px",background:"#F0FBFD",borderLeft:"4px solid #07CBEB",borderRadius:"0 10px 10px 0"}}><p style={{margin:0,fontSize:"13px",fontWeight:600,color:"#022C45",fontStyle:"italic",lineHeight:1.6}}>{block.content||"Quote preview..."}</p></div></div>)}
          {block.type==="list"&&(<div><label className="lbl">Checklist Items</label>{(block.items||[]).map((item,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}><div style={{width:"20px",height:"20px",borderRadius:"5px",background:"rgba(241,97,1,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><input className="ai" placeholder={`Item ${i+1}`} value={item} onChange={e=>helpers.updateItem(block.id,i,e.target.value)} style={{flex:1}}/>{(block.items||[]).length>2&&<button onClick={()=>helpers.removeItem(block.id,i)} style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(239,68,68,0.2)",background:"transparent",cursor:"pointer",color:"#ef4444",fontSize:"13px"}}>×</button>}</div>))}<button onClick={()=>helpers.addItem(block.id)} style={{marginTop:"4px",padding:"6px 12px",borderRadius:"6px",border:"1px dashed rgba(2,44,69,0.15)",background:"transparent",color:"#6B7280",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>+ Add Item</button></div>)}
        </div>
      );})}
      <div style={{position:"relative"}}>
        <button onClick={()=>setShowAdd(!showAdd)} style={{padding:"8px 16px",borderRadius:"8px",border:"1.5px dashed rgba(2,44,69,0.15)",background:"transparent",color:"#6B7280",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",width:"100%",textAlign:"left"}}>+ Add Block — Section, Quote, Checklist, or Paragraph</button>
        {showAdd&&(<div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#fff",borderRadius:"12px",border:"1px solid rgba(2,44,69,0.1)",boxShadow:"0 12px 32px rgba(2,44,69,0.12)",zIndex:50,overflow:"hidden"}}>
          {(Object.entries(BLOCK_META) as [BlockType,typeof BLOCK_META[BlockType]][]).filter(([t])=>t!=="intro").map(([type,meta])=>(
            <button key={type} onClick={()=>helpers.add(type)} style={{width:"100%",display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"inherit",textAlign:"left",borderBottom:"1px solid rgba(2,44,69,0.05)"}}
              onMouseEnter={e=>(e.currentTarget.style.background=`${meta.color}08`)}
              onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
              <div style={{width:"32px",height:"32px",borderRadius:"8px",background:`${meta.color}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{width:"10px",height:"10px",borderRadius:"2px",background:meta.color}}/></div>
              <div><div style={{fontSize:"13px",fontWeight:800,color:"#022C45"}}>{meta.label}</div><div style={{fontSize:"11px",color:"#9CA3AF",marginTop:"1px"}}>{meta.desc}</div></div>
            </button>
          ))}
        </div>)}
      </div>
    </div>
  );

  // ── Render: FAQ Editor ────────────────────────────────────────
  const renderFaqEditor = (f:FormData, helpers:ReturnType<typeof faqHelpers>) => (
    <div className="faq-section" style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",marginBottom:"16px",overflow:"hidden"}}>
      <div style={{background:"linear-gradient(135deg,#022C45 0%,#034066 100%)",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{width:"36px",height:"36px",borderRadius:"10px",background:"rgba(241,97,1,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:"18px"}}>❓</span>
          </div>
          <div>
            <p style={{fontSize:"13px",fontWeight:800,color:"#fff",textTransform:"uppercase",letterSpacing:"1px",margin:0}}>FAQ Section</p>
            <p style={{fontSize:"11px",color:"rgba(255,255,255,0.5)",margin:"2px 0 0"}}>{f.faqs.length} question{f.faqs.length!==1?"s":""} added</p>
          </div>
        </div>
        <button onClick={()=>helpers.add()}
          style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 16px",borderRadius:"9px",border:"none",background:"#F16101",color:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 12px rgba(241,97,1,0.3)",transition:"all .2s"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="#d95500";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="#F16101";}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add FAQ
        </button>
      </div>

      <div style={{padding:"20px"}}>
        {f.faqs.length === 0 ? (
          <div style={{textAlign:"center",padding:"32px 20px",background:"rgba(2,44,69,0.02)",borderRadius:"12px",border:"1.5px dashed rgba(2,44,69,0.12)"}}>
            <div style={{fontSize:"32px",marginBottom:"10px"}}>💬</div>
            <p style={{fontSize:"14px",fontWeight:700,color:"#022C45",margin:"0 0 4px"}}>No FAQs yet</p>
            <p style={{fontSize:"12px",color:"#9CA3AF",margin:"0 0 16px"}}>Add frequently asked questions to boost SEO and help readers.</p>
            <button onClick={()=>helpers.add()} style={{padding:"9px 20px",borderRadius:"9px",border:"none",background:"#F16101",color:"#fff",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              + Add First FAQ
            </button>
          </div>
        ) : (
          f.faqs.map((faq, idx) => (
            <div key={faq.id} style={{borderRadius:"12px",border:"1px solid rgba(2,44,69,0.1)",borderLeft:"3px solid #F16101",padding:"18px",marginBottom:"12px",background:"#FAFBFC"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <div style={{width:"24px",height:"24px",borderRadius:"6px",background:"rgba(241,97,1,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:"11px",fontWeight:900,color:"#F16101"}}>Q{idx+1}</span>
                  </div>
                  <span style={{fontSize:"11px",fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.5px"}}>FAQ Item</span>
                </div>
                <div style={{display:"flex",gap:"4px"}}>
                  <button onClick={()=>helpers.move(faq.id,-1)} disabled={idx===0}
                    style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(2,44,69,0.1)",background:"transparent",cursor:idx===0?"not-allowed":"pointer",color:"#6B7280",fontSize:"13px",opacity:idx===0?0.3:1}}>↑</button>
                  <button onClick={()=>helpers.move(faq.id,1)} disabled={idx===f.faqs.length-1}
                    style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(2,44,69,0.1)",background:"transparent",cursor:idx===f.faqs.length-1?"not-allowed":"pointer",color:"#6B7280",fontSize:"13px",opacity:idx===f.faqs.length-1?0.3:1}}>↓</button>
                  <button onClick={()=>helpers.remove(faq.id)}
                    style={{width:"28px",height:"28px",borderRadius:"7px",border:"1px solid rgba(239,68,68,0.2)",background:"transparent",cursor:"pointer",color:"#ef4444",fontSize:"14px",fontWeight:700}}>×</button>
                </div>
              </div>
              <div style={{marginBottom:"10px"}}>
                <label className="lbl" style={{color:"#F16101"}}>Question</label>
                <input className="ai" placeholder="e.g. What documents are required for a UK student visa?"
                  value={faq.question} onChange={e=>helpers.update(faq.id,{question:e.target.value})} style={{fontWeight:600}}/>
              </div>
              <div>
                <label className="lbl">Answer</label>
                <textarea className="at" rows={3} placeholder="Provide a clear, helpful answer..." value={faq.answer} onChange={e=>helpers.update(faq.id,{answer:e.target.value})}/> 
                <p style={{fontSize:"11px",color:"#9CA3AF",margin:"4px 0 0"}}>{faq.answer.split(/\s+/).filter(Boolean).length} words</p>
              </div>
            </div>
          ))
        )}
        {f.faqs.length > 0 && (
          <button onClick={()=>helpers.add()}
            style={{width:"100%",padding:"10px",borderRadius:"9px",border:"1.5px dashed rgba(241,97,1,0.35)",background:"rgba(241,97,1,0.03)",color:"#F16101",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginTop:"4px",transition:"all .2s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(241,97,1,0.08)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(241,97,1,0.03)";}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Another FAQ
          </button>
        )}
      </div>
    </div>
  );

  // ── Render: SEO Meta Card ─────────────────────────────────────
  const renderSeoCard = (f:FormData, fieldSetter:(k:keyof FormData, v:string)=>void) => (
    <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",marginBottom:"16px", wordBreak:"break-word",overflowWrap:"break-word"}}>
      <div style={{padding:"16px 20px",borderBottom:"1px solid rgba(2,44,69,0.06)",background:"rgba(2,44,69,0.02)",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"32px",height:"32px",borderRadius:"9px",background:"#022C45",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <div>
          <p style={{fontSize:"13px",fontWeight:800,color:"#022C45",textTransform:"uppercase",letterSpacing:"1px",margin:0}}>SEO & Meta</p>
          <p style={{fontSize:"11px",color:"#9CA3AF",margin:"2px 0 0"}}>Google search snippet and metadata</p>
        </div>
      </div>
      <div style={{padding:"20px"}}>
        <div style={{background:"#F9FAFB",borderRadius:"10px",padding:"16px",marginBottom:"20px",border:"1px solid rgba(2,44,69,0.06)"}}>
          <p style={{fontSize:"10px",fontWeight:800,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 10px"}}>Google Preview</p>
          <div style={{fontSize:"18px",color:"#1a0dab",fontWeight:400,lineHeight:1.3,marginBottom:"4px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            {f.metaTitle || <span style={{color:"#9CA3AF",fontStyle:"italic",fontSize:"14px"}}>Meta title will appear here...</span>}
          </div>
          <div style={{fontSize:"13px",color:"#006621",marginBottom:"4px"}}>edificationoverseas.in/blog/{f.slug||"your-slug"}</div>
          <div style={{fontSize:"13px",color:"#545454",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical" as any,overflow:"hidden",wordBreak:"break-word",overflowWrap:"break-word"}}>
            {f.metaDescription || <span style={{color:"#9CA3AF",fontStyle:"italic"}}>Meta description will appear here...</span>}
          </div>
        </div>
        <div style={{marginBottom:"16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}}>
            <label className="lbl" style={{margin:0}}>Meta Title</label>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <div style={{width:"80px",height:"4px",borderRadius:"2px",background:"rgba(2,44,69,0.08)",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min((f.metaTitle.length/60)*100,100)}%`,background:f.metaTitle.length>60?"#dc2626":f.metaTitle.length>=55?"#22c55e":"#F16101",borderRadius:"2px",transition:"width .2s"}}/>
              </div>
              <span style={{fontSize:"11px",fontWeight:700,color:f.metaTitle.length>60?"#dc2626":f.metaTitle.length>=55?"#22c55e":"#9CA3AF",minWidth:"40px",textAlign:"right"}}>{f.metaTitle.length}/60</span>
            </div>
          </div>
          <input className="ai" value={f.metaTitle} onChange={e=>fieldSetter("metaTitle",e.target.value)}
            placeholder="e.g. Study in Germany 2026 | Edification Overseas"
            maxLength={60}
            style={{borderColor:f.metaTitle.length>60?"#dc2626":f.metaTitle.length>=55?"rgba(34,197,94,0.5)":"rgba(2,44,69,0.1)"}}/>
          {f.metaTitle.length>60&&<p style={{fontSize:"11px",color:"#dc2626",margin:"4px 0 0",fontWeight:600}}>Over limit! Reduce by {f.metaTitle.length-60} characters.</p>}
          {f.metaTitle.length>=55&&f.metaTitle.length<=60&&<p style={{fontSize:"11px",color:"#22c55e",margin:"4px 0 0",fontWeight:600}}>Perfect length!</p>}
        </div>
        <div style={{marginBottom:"16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}}>
            <label className="lbl" style={{margin:0}}>Meta Description</label>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <div style={{width:"80px",height:"4px",borderRadius:"2px",background:"rgba(2,44,69,0.08)",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min((f.metaDescription.length/165)*100,100)}%`,background:f.metaDescription.length>165?"#dc2626":f.metaDescription.length>=155?"#22c55e":"#F16101",borderRadius:"2px",transition:"width .2s"}}/>
              </div>
              <span style={{fontSize:"11px",fontWeight:700,color:f.metaDescription.length>165?"#dc2626":f.metaDescription.length>=155?"#22c55e":"#9CA3AF",minWidth:"50px",textAlign:"right"}}>{f.metaDescription.length}/165</span>
            </div>
          </div>
          <textarea className="at" rows={3} maxLength={170} value={f.metaDescription} onChange={e=>fieldSetter("metaDescription",e.target.value)}
            placeholder="Short summary for Google search results (155-165 chars ideal)..."
            style={{borderColor:f.metaDescription.length>165?"#dc2626":f.metaDescription.length>=155?"rgba(34,197,94,0.5)":"rgba(2,44,69,0.1)"}}/>
          {f.metaDescription.length>165&&<p style={{fontSize:"11px",color:"#dc2626",margin:"4px 0 0",fontWeight:600}}>Over limit! Reduce by {f.metaDescription.length-165} characters.</p>}
          {f.metaDescription.length>=155&&f.metaDescription.length<=165&&<p style={{fontSize:"11px",color:"#22c55e",margin:"4px 0 0",fontWeight:600}}>Perfect length!</p>}
        </div>
        <div style={{marginBottom:"16px"}}>
          <label className="lbl">SEO URL Slug</label>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"13px",color:"#9CA3AF",fontWeight:600,whiteSpace:"nowrap"}}>/blog/</span>
            <input className="ai" value={f.slug} onChange={e=>fieldSetter("slug",slugify(e.target.value))} placeholder="short-seo-slug"
              style={{paddingLeft:"54px"}}/>
          </div>
          {f.slug&&<p style={{fontSize:"11px",color:"#9CA3AF",margin:"4px 0 0"}}>Full URL: <span style={{color:"#022C45",fontWeight:600}}>edificationoverseas.in/blog/{f.slug}</span></p>}
        </div>
        <div>
          <label className="lbl">Meta Keywords</label>
          <textarea className="at" rows={2} placeholder="uk visa guide, student visa 2026, edification overseas, study abroad..." value={f.metaKeywords} onChange={e=>fieldSetter("metaKeywords",e.target.value)}/>
          <p style={{fontSize:"11px",color:"#9CA3AF",margin:"4px 0 0"}}>
            {f.metaKeywords.split(",").filter(k=>k.trim()).length} keywords &mdash; aim for 8-12 terms.
          </p>
        </div>
      </div>
    </div>
  );

  // ── Render: Sidebar ───────────────────────────────────────────
  const renderSidebar = (f:FormData, chks:ReturnType<typeof checks>) => {
    const wc2=wordCount(f); const pct=Math.min((wc2/600)*100,100); const col=wc2<400?"#F16101":wc2<600?"#C9A24D":"#22c55e"; const allPass=chks.every(c=>c.done);
    return(
      <div style={{position:"sticky",top:"72px"}}>
        <div style={{background:"#022C45",borderRadius:"14px",padding:"20px",marginBottom:"14px"}}>
          <p style={{fontSize:"11px",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",color:"#F16101",margin:"0 0 12px"}}>Publishing Checklist</p>
          {chks.map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"7px 0",borderBottom:i<chks.length-1?"1px solid rgba(255,255,255,.06)":"none"}}>
            <div style={{width:"17px",height:"17px",borderRadius:"50%",flexShrink:0,background:c.done?"#22c55e":"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {c.done?<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>:<div style={{width:"4px",height:"4px",borderRadius:"50%",background:"rgba(255,255,255,.3)"}}/>}
            </div>
            <span style={{fontSize:"12px",fontWeight:600,color:c.done?"rgba(255,255,255,.8)":"rgba(255,255,255,.35)"}}>{c.label}</span>
          </div>))}
          {allPass&&<div style={{marginTop:"12px",padding:"8px 12px",background:"rgba(34,197,94,.1)",borderRadius:"8px",border:"1px solid rgba(34,197,94,.2)"}}><p style={{margin:0,fontSize:"11px",fontWeight:700,color:"#22c55e",textAlign:"center"}}>✓ Ready to Publish</p></div>}
        </div>
        <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"18px",marginBottom:"14px"}}>
          <p style={{fontSize:"11px",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.2px",color:"#022C45",margin:"0 0 10px"}}>Word Count</p>
          <div style={{display:"flex",alignItems:"flex-end",gap:"4px",marginBottom:"8px"}}><span style={{fontSize:"30px",fontWeight:900,color:col,lineHeight:1}}>{wc2}</span><span style={{fontSize:"13px",color:"#9CA3AF",paddingBottom:"3px"}}> / 600</span></div>
          <div style={{height:"5px",borderRadius:"3px",background:"rgba(2,44,69,.06)",overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:col,borderRadius:"3px",transition:"width .3s"}}/></div>
          <p style={{fontSize:"12px",color:"#9CA3AF",margin:"8px 0 0"}}>{wc2<400?"Keep writing...":wc2<600?"Almost there!":"Target reached ✓"}</p>
        </div>
        {/* FAQ counter in sidebar */}
        <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"18px"}}>
          <p style={{fontSize:"11px",fontWeight:800,textTransform:"uppercase",letterSpacing:"1.2px",color:"#022C45",margin:"0 0 10px"}}>FAQ Section</p>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"40px",height:"40px",borderRadius:"10px",background:f.faqs.length>0?"rgba(241,97,1,0.1)":"rgba(2,44,69,0.04)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:"18px"}}>❓</span>
            </div>
            <div>
              <p style={{margin:0,fontSize:"20px",fontWeight:900,color:f.faqs.length>0?"#F16101":"#9CA3AF",lineHeight:1}}>{f.faqs.length}</p>
              <p style={{margin:"2px 0 0",fontSize:"11px",color:"#9CA3AF"}}>FAQ{f.faqs.length!==1?"s":""} added</p>
            </div>
          </div>
          {f.faqs.length===0&&<p style={{fontSize:"11px",color:"#9CA3AF",margin:"10px 0 0",lineHeight:1.5}}>Scroll down to add FAQs. They improve SEO and user experience.</p>}
        </div>
      </div>
    );
  };

  // ── Loading spinner ───────────────────────────────────────────
  const Spinner = () => <div style={{textAlign:"center",padding:"60px 0"}}><div style={{width:"32px",height:"32px",border:"3px solid rgba(2,44,69,0.1)",borderTop:"3px solid #F16101",borderRadius:"50%",margin:"0 auto 12px",animation:"spin 0.8s linear infinite"}}/><p style={{color:"#9CA3AF",fontWeight:600}}>Loading...</p></div>;

  // ── Success screen ────────────────────────────────────────────
  if (writeStatus==="success") return(
    <main style={{minHeight:"100vh",background:"#F9FAFB",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:"20px",padding:"48px 40px",maxWidth:"460px",width:"100%",textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,0.07)"}}>
        <div style={{width:"64px",height:"64px",borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
        <h2 style={{fontSize:"22px",fontWeight:900,color:"#022C45",margin:"0 0 10px"}}>Blog Post Published!</h2>
        <p style={{fontSize:"14px",color:"#6b7280",margin:"0 0 28px",lineHeight:1.6}}>Your article is now live on the website.</p>
        <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
          <Link href={`/blog/${publishedSlug}`} target="_blank" style={{padding:"10px 20px",borderRadius:"9px",background:"#022C45",color:"#fff",fontWeight:700,fontSize:"13px",textDecoration:"none"}}>View Post →</Link>
          <button onClick={handleReset} style={{padding:"10px 20px",borderRadius:"9px",border:"1.5px solid rgba(2,44,69,0.15)",background:"#fff",color:"#022C45",fontWeight:700,fontSize:"13px",cursor:"pointer",fontFamily:"inherit"}}>Write Another</button>
          <button onClick={()=>{handleReset();setTab("manage");}} style={{padding:"10px 20px",borderRadius:"9px",border:"1.5px solid rgba(2,44,69,0.15)",background:"#fff",color:"#022C45",fontWeight:700,fontSize:"13px",cursor:"pointer",fontFamily:"inherit"}}>Manage Posts</button>
        </div>
      </div>
    </main>
  );

  return (
    <main style={{background:"#F9FAFB",minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        .ai{width:100%;padding:10px 13px;border:1.5px solid rgba(2,44,69,0.1);border-radius:9px;background:#fff;font-size:14px;color:#022C45;font-family:inherit;outline:none;transition:border-color .2s;box-sizing:border-box;word-break:break-word;overflow-wrap:break-word;}
        .ai:focus{border-color:#F16101;box-shadow:0 0 0 3px rgba(241,97,1,.08);}
        .at{width:100%;padding:10px 13px;border:1.5px solid rgba(2,44,69,0.1);border-radius:9px;background:#fff;font-size:14px;color:#374151;font-family:inherit;resize:vertical;outline:none;line-height:1.65;transition:border-color .2s;box-sizing:border-box;word-break:break-word;overflow-wrap:break-word;}
        .at:focus{border-color:#F16101;box-shadow:0 0 0 3px rgba(241,97,1,.08);}
        .lbl{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:#022C45;margin-bottom:6px;display:block;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .media-card{background:#fff;border-radius:12px;border:1px solid rgba(2,44,69,0.08);overflow:hidden;transition:all .25s ease;}
        .media-card:hover{box-shadow:0 8px 24px rgba(2,44,69,0.1);border-color:rgba(241,97,1,0.2);}
        .del-btn{padding:7px 12px;border-radius:7px;border:1px solid rgba(239,68,68,0.2);background:rgba(239,68,68,0.04);color:#ef4444;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s;}
        .del-btn:hover{background:#ef4444;color:#fff;}
        .add-card{background:#fff;border-radius:14px;border:1.5px dashed rgba(2,44,69,0.15);padding:24px;margin-bottom:24px;}
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={{background:"#022C45",padding:"14px 24px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(2,44,69,.2)"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginRight:"8px"}}>
              <div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#F16101"}}/>
              <span style={{fontSize:"14px",fontWeight:800,color:"#fff"}}>Admin CRM</span>
            </div>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>{setTab(t.id);if(t.id==="manage")setManageView("list");}}
                style={{padding:"6px 14px",borderRadius:"6px",border:"none",background:tab===t.id?"rgba(241,97,1,0.9)":"rgba(255,255,255,0.08)",color:tab===t.id?"#fff":"rgba(255,255,255,0.5)",fontWeight:700,fontSize:"12px",cursor:"pointer",fontFamily:"inherit",transition:"all .2s",display:"flex",alignItems:"center",gap:"5px"}}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            {tab==="write"&&(
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{width:"70px",height:"4px",borderRadius:"2px",background:"rgba(255,255,255,.1)",overflow:"hidden"}}><div style={{height:"100%",width:`${wcPct}%`,background:wcColor,borderRadius:"2px",transition:"width .3s"}}/></div>
                <span style={{fontSize:"12px",fontWeight:700,color:wcColor}}>{wc}/600</span>
              </div>
            )}
            {tab==="write"&&<button onClick={()=>setPreview(p=>!p)} style={{padding:"7px 14px",borderRadius:"6px",border:"1px solid rgba(255,255,255,.2)",background:"transparent",color:"#fff",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{preview?"← Edit":"Preview →"}</button>}
            {tab==="manage"&&manageView==="edit"&&<button onClick={()=>{setManageView("list");setEditPost(null);}} style={{padding:"7px 14px",borderRadius:"6px",border:"1px solid rgba(255,255,255,.2)",background:"transparent",color:"#fff",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>← Back to List</button>}
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"28px 24px 80px"}}>

        {/* ══════════════ WRITE TAB ══════════════ */}
        {tab==="write" && showDraftBanner && (
          <div style={{background:"#FFF7ED",border:"1px solid rgba(241,97,1,0.25)",borderRadius:"12px",padding:"14px 18px",marginBottom:"18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{fontSize:"18px"}}>📝</span>
              <p style={{margin:0,fontSize:"13px",fontWeight:700,color:"#92400e"}}>Unsaved Draft Found — Would You Like To Restore It?</p>
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>{
                try{
                  const saved = localStorage.getItem(DRAFT_KEY);
                  if(saved) setForm(JSON.parse(saved));
                }catch{}
                setShowDraftBanner(false);
              }} style={{padding:"7px 16px",borderRadius:"8px",border:"none",background:"#F16101",color:"#fff",fontWeight:700,fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>Restore Draft</button>
              <button onClick={()=>{
                try{ localStorage.removeItem(DRAFT_KEY); }catch{}
                setShowDraftBanner(false);
              }} style={{padding:"7px 16px",borderRadius:"8px",border:"1px solid rgba(2,44,69,0.15)",background:"#fff",color:"#6B7280",fontWeight:700,fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>Discard</button>
            </div>
          </div>
        )}
        {tab==="write"&&(!preview?(
          <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:"20px",alignItems:"flex-start"}}>
            <div>
              {/* Cover Image */}
              <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"20px",marginBottom:"16px"}}>
                <label className="lbl">Cover Image</label>
                <label style={{display:"block",cursor:"pointer",marginBottom:"10px"}}>
                  <div style={{border:"2px dashed rgba(2,44,69,0.15)",borderRadius:"12px",padding:"20px",textAlign:"center",background:"rgba(2,44,69,0.02)",cursor:"pointer"}}
                    onDragOver={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="#F16101";}}
                    onDragLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";}}
                    onDrop={async e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";const file=e.dataTransfer.files[0];if(!file)return;await uploadFile(file,"blogs",()=>{},(path)=>setField("coverImage",path),(err)=>alert(err));}}>
                    {form.coverImage
                      ?<div><img src={form.coverImage} alt="" style={{maxHeight:"80px",maxWidth:"100%",borderRadius:"6px",marginBottom:"6px",objectFit:"cover"}}/><p style={{margin:0,fontSize:"12px",color:"#16a34a",fontWeight:700}}>✓ {form.coverImage.split("/").pop()}</p><p style={{margin:"3px 0 0",fontSize:"11px",color:"#9CA3AF"}}>Click or drag to replace</p></div>
                      :<div><div style={{fontSize:"24px",marginBottom:"6px"}}>🖼</div><p style={{margin:"0 0 3px",fontSize:"13px",fontWeight:700,color:"#022C45"}}>Click to browse or drag & drop</p><p style={{margin:0,fontSize:"11px",color:"#9CA3AF"}}>JPG, PNG, WebP · 1200×630px recommended · Max 20MB</p></div>
                    }
                  </div>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;await uploadFile(file,"blogs",()=>{},(path)=>setField("coverImage",path),(err)=>alert(err));e.target.value="";}}/>
                </label>
              </div>

              {/* Article Details */}
              <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"20px",marginBottom:"16px"}}>
                <p style={{fontSize:"13px",fontWeight:800,color:"#022C45",textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px"}}>Article Details</p>
                <div style={{marginBottom:"14px"}}><label className="lbl">Title *</label><input className="ai" placeholder="e.g. Complete Guide to Studying in Germany 2026" value={form.title} onChange={e=>setField("title",e.target.value)}/></div>
                <div style={{marginBottom:"14px"}}><label className="lbl">Excerpt *</label><textarea className="at" rows={2} placeholder="1-2 sentences for blog cards and Google..." value={form.excerpt} onChange={e=>setField("excerpt",e.target.value)}/><p style={{fontSize:"11px",color:form.excerpt.length>160?"#F16101":"#9CA3AF",margin:"4px 0 0"}}>{form.excerpt.length}/160</p></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
                  {renderCategoryDropdown(form.category, false, catDropdownOpen, setCatDropdownOpen)}
                  <div><label className="lbl">Read Time</label><input className="ai" placeholder="6 min read" value={form.readTime} onChange={e=>setField("readTime",e.target.value)}/></div>
                  <div><label className="lbl">Author Role</label><input className="ai" placeholder="Visa Experts" value={form.authorRole} onChange={e=>setField("authorRole",e.target.value)}/></div>
                </div>
              </div>

              {/* Content Blocks */}
              {renderBlockEditor(form,wH,addMenu,setAddMenu)}

              {/* FAQ Section */}
              {renderFaqEditor(form, wFaq)}

              {/* SEO Meta Card */}
              {renderSeoCard(form, setField)}

              {/* Publish Button */}
              <button onClick={handlePublish} disabled={writeStatus==="loading"}
                style={{width:"100%",padding:"15px",borderRadius:"12px",background:writeStatus==="loading"?"#9CA3AF":writeReady?"#F16101":"#9CA3AF",color:"#fff",border:"none",fontSize:"15px",fontWeight:800,cursor:writeStatus==="loading"||!writeReady?"not-allowed":"pointer",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"inherit",boxShadow:writeReady&&writeStatus!=="loading"?"0 8px 20px rgba(241,97,1,.25)":"none"}}>
                {writeStatus==="loading"?"Publishing...":"Publish Blog Post →"}
              </button>
              {writeStatus==="error"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#dc2626",fontWeight:600}}>⚠ {writeMsg}</p></div>}
              {!writeReady&&writeStatus!=="error"&&<p style={{textAlign:"center",fontSize:"12px",color:"#9CA3AF",marginTop:"10px"}}>Complete all checklist items to enable publishing.</p>}
            </div>
            <div>{renderSidebar(form,writeChecks)}</div>
          </div>
        ):(
          /* Preview */
          <div style={{background:"#fff",borderRadius:"16px",border:"1px solid rgba(2,44,69,.07)",padding:"40px 48px",maxWidth:"740px",margin:"0 auto"}}>
            {form.coverImage&&<div style={{borderRadius:"12px",overflow:"hidden",aspectRatio:"16/7",background:"#e8ecf0",marginBottom:"28px"}}><img src={form.coverImage} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
            <h1 style={{fontSize:"30px",fontWeight:900,color:"#022C45",lineHeight:1.15,marginBottom:"20px"}}>{form.title||"Article Title"}</h1>
              {form.blocks.map((b, i) => {if (b.type === "intro" || b.type === "p") { return (<p key={i} style={{ fontSize: b.type === "intro" ? 17 : 15, fontWeight: b.type === "intro" ? 600 : 400, color: b.type === "intro" ? "#022C45" : "#374151", lineHeight: 1.8, marginBottom: "20px",}}dangerouslySetInnerHTML={{ __html: b.content ? formatPreviewContent(b.content) : "<em style='color:#9CA3AF'>Empty...</em>",}}/>);}
                if (b.type === "h2") {return (<div key={i}><h2 style={{ fontSize: "22px", fontWeight: 900, color: "#022C45", margin: "28px 0 10px",}}><span style={{ color: "#F16101", marginRight: "6px" }}>▌</span>{b.heading}</h2><p style={{ fontSize: "15px", color: "#374151", lineHeight: 1.8, marginBottom: "20px", }}dangerouslySetInnerHTML={{ __html: formatPreviewContent(b.content || ""),}}/></div>);}
                if (b.type === "quote") {return (<div key={i} style={{ margin: "20px 0", padding: "16px 18px", background: "#F0FBFD", borderLeft: "4px solid #07CBEB", borderRadius: "0 10px 10px 0", }} ><p style={{ margin: 0,fontSize: "14px", fontWeight: 600, color: "#022C45", fontStyle: "italic", lineHeight: 1.6,}} dangerouslySetInnerHTML={{__html: formatPreviewContent(b.content || ""),}} /></div>);}
                if (b.type === "list") {return (<div key={i} style={{ marginBottom: "16px" }}>{(b.items || []).filter(Boolean) .map((item, j) => (<div key={j} style={{ display: "flex", gap: "10px", padding: "10px 12px", background: "#F9FAFB", borderRadius: "8px", marginBottom: "6px", fontSize: "14px", color: "#374151",}}><div style={{ width: "18px", height: "18px", borderRadius: "5px", background: "rgba(241,97,1,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,}}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> <polyline points="20 6 9 17 4 12" /></svg></div><span>{item}</span></div>))}</div>);}
                return null;
              })}

            {/* FAQ Preview */}
            {form.faqs.length>0&&(
              <div style={{marginTop:"32px",borderTop:"2px solid rgba(2,44,69,0.06)",paddingTop:"28px"}}>
                <h2 style={{fontSize:"22px",fontWeight:900,color:"#022C45",marginBottom:"18px"}}><span style={{color:"#F16101",marginRight:"6px"}}>▌</span>Frequently Asked Questions</h2>
                {form.faqs.map((faq,i)=>(
                  <div key={faq.id} style={{marginBottom:"12px",borderRadius:"10px",border:"1px solid rgba(2,44,69,0.08)",overflow:"hidden"}}>
                    <div style={{padding:"14px 16px",background:"rgba(2,44,69,0.02)",display:"flex",alignItems:"center",gap:"10px"}}>
                      <span style={{width:"22px",height:"22px",borderRadius:"6px",background:"rgba(241,97,1,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:900,color:"#F16101",flexShrink:0}}>Q</span>
                      <p style={{margin:0,fontSize:"14px",fontWeight:700,color:"#022C45"}}>{faq.question||"Question..."}</p>
                    </div>
                    <div style={{padding:"12px 16px"}}><p style={{margin:0,fontSize:"14px",color:"#374151",lineHeight:1.7}}>{faq.answer||"Answer..."}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* ══════════════ MANAGE BLOGS TAB ══════════════ */}
        {tab==="manage"&&(
          <>
            {manageView==="list"&&(
              <>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"24px",flexWrap:"wrap",gap:"12px"}}>
                  <div><h2 style={{fontSize:"20px",fontWeight:900,color:"#022C45",margin:"0 0 4px"}}>All Blog Posts</h2><p style={{fontSize:"13px",color:"#9CA3AF",margin:0}}>{posts.length} published</p></div>
                  <input className="ai" placeholder="Search by title or category..." value={blogSearch} onChange={e=>setBlogSearch(e.target.value)} style={{width:"280px",maxWidth:"100%"}}/>
                </div>
                {manageLoading?<Spinner/>:filteredPosts.length===0?<div style={{textAlign:"center",padding:"60px 0",color:"#9CA3AF",fontWeight:600}}>{blogSearch?"No posts match.":"No posts yet."}</div>:
                  filteredPosts.map(post=>(
                    <div key={post.id} style={{background:"#fff",borderRadius:"16px",border:"1px solid rgba(2,44,69,0.07)",padding:"20px 24px",marginBottom:"14px",display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}}>
                      <div style={{width:"80px",height:"56px",borderRadius:"8px",overflow:"hidden",background:"#e8ecf0",flexShrink:0}}><img src={post.coverImage} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).style.opacity="0";}}/></div>
                      <div style={{flex:"1 1 300px",minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px",flexWrap:"wrap"}}>
                          <span style={{fontSize:"10px",fontWeight:800,textTransform:"uppercase",letterSpacing:"1px",color:"#F16101",background:"rgba(241,97,1,0.08)",padding:"3px 8px",borderRadius:"4px"}}>{post.category}</span>
                          <span style={{fontSize:"12px",color:"#9CA3AF",fontWeight:600}}>{post.date}</span>
                          <span style={{fontSize:"12px",color:"#9CA3AF"}}>· {post.readTime}</span>
                        </div>
                        <h3 style={{fontSize:"15px",fontWeight:800,color:"#022C45",margin:"0 0 4px",lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{post.title}</h3>
                        <p style={{fontSize:"12px",color:"#9CA3AF",margin:0,fontFamily:"monospace"}}>/blog/{post.slug}</p>
                      </div>
                      <div style={{display:"flex",gap:"8px",flexShrink:0,flexWrap:"wrap"}}>
                        <Link href={`/blog/${post.slug}`} target="_blank" style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid rgba(2,44,69,0.12)",background:"transparent",color:"#022C45",fontSize:"12px",fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"5px"}}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>View
                        </Link>
                        <button onClick={()=>openEdit(post)} style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid rgba(7,203,235,0.3)",background:"rgba(7,203,235,0.05)",color:"#022C45",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",gap:"5px"}}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit
                        </button>
                        {deleteConfirm===post.slug?(
                          <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                            <span style={{fontSize:"12px",color:"#dc2626",fontWeight:600}}>Delete?</span>
                            <button onClick={()=>handleBlogDelete(post.slug)} disabled={deleteStatus[post.slug]==="loading"} style={{padding:"8px 14px",borderRadius:"8px",border:"none",background:"#ef4444",color:"#fff",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{deleteStatus[post.slug]==="loading"?"...":"Yes"}</button>
                            <button onClick={()=>setDeleteConfirm(null)} style={{padding:"8px 14px",borderRadius:"8px",border:"1px solid rgba(2,44,69,0.12)",background:"#fff",color:"#6B7280",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>No</button>
                          </div>
                        ):(
                          <button onClick={()=>setDeleteConfirm(post.slug)} className="del-btn">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                }
              </>
            )}

            {manageView==="edit"&&editPost&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:"20px",alignItems:"flex-start"}}>
                <div>
                  <div style={{background:"#FFF7ED",borderRadius:"12px",border:"1px solid rgba(241,97,1,0.2)",padding:"14px 18px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"10px"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F16101" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    <p style={{margin:0,fontSize:"13px",fontWeight:700,color:"#92400e"}}>Editing: <span style={{color:"#022C45"}}>{editPost.title}</span></p>
                  </div>

                  {/* Edit: Cover Image */}
                  <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"20px",marginBottom:"16px"}}>
                    <label className="lbl">Cover Image</label>
                    <label style={{display:"block",cursor:"pointer",marginBottom:"10px"}}>
                      <div style={{border:"2px dashed rgba(2,44,69,0.15)",borderRadius:"12px",padding:"20px",textAlign:"center",background:"rgba(2,44,69,0.02)",cursor:"pointer"}}
                        onDragOver={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="#F16101";}}
                        onDragLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";}}
                        onDrop={async e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";const file=e.dataTransfer.files[0];if(!file)return;await uploadFile(file,"blogs",()=>{},(path)=>setEditField("coverImage",path),(err)=>alert(err));}}>
                        {editForm.coverImage
                          ?<div><img src={editForm.coverImage} alt="" style={{maxHeight:"80px",maxWidth:"100%",borderRadius:"6px",marginBottom:"6px",objectFit:"cover"}}/><p style={{margin:0,fontSize:"12px",color:"#16a34a",fontWeight:700}}>✓ {editForm.coverImage.split("/").pop()}</p><p style={{margin:"3px 0 0",fontSize:"11px",color:"#9CA3AF"}}>Click or drag to replace</p></div>
                          :<div><div style={{fontSize:"24px",marginBottom:"6px"}}>🖼</div><p style={{margin:"0 0 3px",fontSize:"13px",fontWeight:700,color:"#022C45"}}>Click to browse or drag & drop</p><p style={{margin:0,fontSize:"11px",color:"#9CA3AF"}}>JPG, PNG, WebP · 1200×630px recommended · Max 20MB</p></div>
                        }
                      </div>
                      <input type="file" accept="image/*" style={{display:"none"}} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;await uploadFile(file,"blogs",()=>{},(path)=>setEditField("coverImage",path),(err)=>alert(err));e.target.value="";}}/>
                    </label>
                  </div>

                  {/* Edit: Article Details */}
                  <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"20px",marginBottom:"16px"}}>
                    <p style={{fontSize:"13px",fontWeight:800,color:"#022C45",textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px"}}>Article Details</p>
                    <div style={{marginBottom:"14px"}}><label className="lbl">Title</label><input className="ai" value={editForm.title} onChange={e=>setEditField("title",e.target.value)}/></div>
                    <div style={{marginBottom:"14px"}}><label className="lbl">Excerpt</label><textarea className="at" rows={2} value={editForm.excerpt} onChange={e=>setEditField("excerpt",e.target.value)}/></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
                      {renderCategoryDropdown(editForm.category, true, editCatDropdownOpen, setEditCatDropdownOpen)}
                      <div><label className="lbl">Read Time</label><input className="ai" value={editForm.readTime} onChange={e=>setEditField("readTime",e.target.value)}/></div>
                      <div><label className="lbl">Author Role</label><input className="ai" value={editForm.authorRole} onChange={e=>setEditField("authorRole",e.target.value)}/></div>
                    </div>
                  </div>

                  {/* Edit: Content Blocks */}
                  {renderBlockEditor(editForm,eH,editAddMenu,setEditAddMenu)}

                  {/* Edit: FAQ Section */}
                  {renderFaqEditor(editForm, eFaq)}

                  {/* Edit: SEO Meta Card */}
                  {renderSeoCard(editForm, setEditField)}

                  {/* Save Button */}
                  <button onClick={handleSaveEdit} disabled={editStatus==="loading"}
                    style={{width:"100%",padding:"15px",borderRadius:"12px",background:editStatus==="loading"?"#9CA3AF":editReady?"#F16101":"#9CA3AF",color:"#fff",border:"none",fontSize:"15px",fontWeight:800,cursor:editStatus==="loading"||!editReady?"not-allowed":"pointer",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"inherit"}}>
                    {editStatus==="loading"?"Saving...":editStatus==="success"?"✓ Saved!":"Save Changes →"}
                  </button>
                  {editStatus==="error"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#dc2626",fontWeight:600}}>⚠ {editMsg}</p></div>}
                  {editStatus==="success"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#16a34a",fontWeight:600}}>✓ {editMsg}</p></div>}
                </div>
                <div>{renderSidebar(editForm,editChecks)}</div>
              </div>
            )}
          </>
        )}

        {/* ══════════════ GALLERY (TESTIMONIALS) TAB ══════════════ */}
        {tab==="gallery"&&(
          <div>
            <div style={{marginBottom:"24px"}}>
              <h2 style={{fontSize:"20px",fontWeight:900,color:"#022C45",margin:"0 0 4px"}}>Student Testimonials Gallery</h2>
              <p style={{fontSize:"13px",color:"#9CA3AF",margin:0}}>Manage visa approval photos and video testimonials. {galleryItems.length} items total.</p>
            </div>
            <div className="add-card">
              <p style={{fontSize:"13px",fontWeight:800,color:"#022C45",textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px"}}>+ Add New Entry</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div><label className="lbl">Type</label><select className="ai" value={newGallery.type} onChange={e=>setNewGallery(g=>({...g,type:e.target.value}))} style={{appearance:"none",cursor:"pointer"}}><option value="image">📸 Photo</option><option value="video">🎥 Video</option></select></div>
                <div><label className="lbl">Country</label><select className="ai" value={newGallery.category} onChange={e=>setNewGallery(g=>({...g,category:e.target.value}))} style={{appearance:"none",cursor:"pointer"}}>{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select></div>
                <div><label className="lbl">Student Name *</label><input className="ai" placeholder="e.g. Rahul Sharma" value={newGallery.title} onChange={e=>setNewGallery(g=>({...g,title:e.target.value}))}/></div>
                <div><label className="lbl">Description</label><input className="ai" placeholder="e.g. Visa Approved / University Name" value={newGallery.desc} onChange={e=>setNewGallery(g=>({...g,desc:e.target.value}))}/></div>
              </div>
              <div style={{marginBottom:"14px"}}>
                <label className="lbl">Upload File *</label>
                <label style={{display:"block",cursor:"pointer"}}>
                  <div style={{border:"2px dashed rgba(2,44,69,0.15)",borderRadius:"10px",padding:"20px",textAlign:"center",background:"rgba(2,44,69,0.02)"}}
                    onDragOver={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="#F16101";}}
                    onDragLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";}}
                    onDrop={async e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";const file=e.dataTransfer.files[0];if(!file)return;setGalleryUploading(true);await uploadFile(file,"gallery",setGalleryUploadProgress,(path)=>{setNewGallery(g=>({...g,src:path}));setGalleryUploading(false);},(err)=>{alert(err);setGalleryUploading(false);});}}>
                    {galleryUploading?<p style={{margin:0,color:"#9CA3AF"}}>{galleryUploadProgress||"Uploading..."}</p>:newGallery.src?<p style={{margin:0,fontSize:"12px",color:"#16a34a",fontWeight:700}}>✓ {newGallery.src.split("/").pop()}</p>:<div><p style={{margin:"0 0 4px",fontSize:"13px",fontWeight:700,color:"#022C45"}}>Click to browse or drag & drop</p><p style={{margin:0,fontSize:"11px",color:"#9CA3AF"}}>Photos or Videos · Max 20MB</p></div>}
                  </div>
                  <input type="file" accept="image/*,video/*" style={{display:"none"}} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;setGalleryUploading(true);await uploadFile(file,"gallery",setGalleryUploadProgress,(path)=>{setNewGallery(g=>({...g,src:path}));setGalleryUploading(false);},(err)=>{alert(err);setGalleryUploading(false);});e.target.value="";}}/>
                </label>
              </div>
              <button onClick={handleGalleryAdd} disabled={galleryAddStatus==="loading"} style={{padding:"10px 20px",borderRadius:"9px",border:"none",background:"#F16101",color:"#fff",fontWeight:700,fontSize:"13px",cursor:"pointer",fontFamily:"inherit"}}>{galleryAddStatus==="loading"?"Adding...":"Add Entry →"}</button>
              {galleryAddStatus==="success"&&<span style={{marginLeft:"12px",color:"#16a34a",fontWeight:700,fontSize:"13px"}}>✓ {galleryAddMsg}</span>}
              {galleryAddStatus==="error"&&<span style={{marginLeft:"12px",color:"#dc2626",fontWeight:700,fontSize:"13px"}}>⚠ {galleryAddMsg}</span>}
            </div>
            {galleryLoading?<Spinner/>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"16px"}}>
              {galleryItems.map(item=>(
                <div key={item.id} className="media-card">
                  <div style={{aspectRatio:"1",background:"#f3f4f6",position:"relative",overflow:"hidden"}}>
                    {item.type==="video"?<video src={item.src} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<img src={item.src} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>}
                    <div style={{position:"absolute",top:"8px",right:"8px",padding:"3px 8px",borderRadius:"5px",background:"rgba(0,0,0,0.6)",fontSize:"10px",fontWeight:700,color:"#fff",textTransform:"uppercase"}}>{item.category}</div>
                  </div>
                  <div style={{padding:"12px"}}>
                    <p style={{margin:"0 0 2px",fontSize:"13px",fontWeight:700,color:"#022C45"}}>{item.title}</p>
                    <p style={{margin:"0 0 10px",fontSize:"11px",color:"#9CA3AF"}}>{item.desc}</p>
                    {galleryDeleteConfirm===item.id?(
                      <div style={{display:"flex",gap:"6px"}}>
                        <button onClick={()=>handleGalleryDelete(item.id)} style={{flex:1,padding:"6px",borderRadius:"6px",border:"none",background:"#ef4444",color:"#fff",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Delete</button>
                        <button onClick={()=>setGalleryDeleteConfirm(null)} style={{flex:1,padding:"6px",borderRadius:"6px",border:"1px solid rgba(2,44,69,0.1)",background:"#fff",color:"#6B7280",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
                      </div>
                    ):<button onClick={()=>setGalleryDeleteConfirm(item.id)} className="del-btn" style={{width:"100%",textAlign:"center"}}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>}
          </div>
        )}

        {/* ══════════════ EVENT PHOTOS TAB ══════════════ */}
        {tab==="events-photos"&&(
          <div>
            <div style={{marginBottom:"24px"}}>
              <h2 style={{fontSize:"20px",fontWeight:900,color:"#022C45",margin:"0 0 4px"}}>📸 Event Photos</h2>
              <p style={{fontSize:"13px",color:"#9CA3AF",margin:0}}>{eventPhotos.length} photos uploaded.</p>
            </div>
            <div className="add-card">
              <p style={{fontSize:"13px",fontWeight:800,color:"#022C45",textTransform:"uppercase",letterSpacing:"1px",margin:"0 0 16px"}}>+ Add Event Photo</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div><label className="lbl">Event Title</label><input className="ai" placeholder="e.g. UK Seminar 2025" value={newEvent.title} onChange={e=>setNewEvent(v=>({...v,title:e.target.value}))}/></div>
                <div><label className="lbl">Caption</label><input className="ai" value={newEvent.desc} onChange={e=>setNewEvent(v=>({...v,desc:e.target.value}))}/></div>
              </div>
              <div style={{marginBottom:"14px"}}>
                <label className="lbl">Photo *</label>
                <label style={{display:"block",cursor:"pointer"}}>
                  <div style={{border:"2px dashed rgba(2,44,69,0.15)",borderRadius:"10px",padding:"20px",textAlign:"center",background:"rgba(2,44,69,0.02)"}}
                    onDragOver={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="#F16101";}}
                    onDragLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";}}
                    onDrop={async e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";const file=e.dataTransfer.files[0];if(!file)return;setEventUploading(true);await uploadFile(file,"events",setEventUploadProgress,(path)=>{setNewEvent(v=>({...v,src:path}));setEventUploading(false);},(err)=>{alert(err);setEventUploading(false);});}}>
                    {eventUploading?<p style={{margin:0,color:"#9CA3AF"}}>{eventUploadProgress||"Uploading..."}</p>:newEvent.src?<p style={{margin:0,fontSize:"12px",color:"#16a34a",fontWeight:700}}>✓ {newEvent.src.split("/").pop()}</p>:<div><p style={{margin:"0 0 4px",fontSize:"13px",fontWeight:700,color:"#022C45"}}>Click to browse or drag & drop</p><p style={{margin:0,fontSize:"11px",color:"#9CA3AF"}}>JPG, PNG · Max 20MB</p></div>}
                  </div>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;setEventUploading(true);await uploadFile(file,"events",setEventUploadProgress,(path)=>{setNewEvent(v=>({...v,src:path}));setEventUploading(false);},(err)=>{alert(err);setEventUploading(false);});e.target.value="";}}/>
                </label>
              </div>
              <button onClick={handleEventAdd} disabled={eventAddStatus==="loading"} style={{padding:"10px 20px",borderRadius:"9px",border:"none",background:"#F16101",color:"#fff",fontWeight:700,fontSize:"13px",cursor:"pointer",fontFamily:"inherit"}}>{eventAddStatus==="loading"?"Adding...":"Add Photo →"}</button>
              {eventAddStatus==="success"&&<span style={{marginLeft:"12px",color:"#16a34a",fontWeight:700,fontSize:"13px"}}>✓ {eventAddMsg}</span>}
              {eventAddStatus==="error"&&<span style={{marginLeft:"12px",color:"#dc2626",fontWeight:700,fontSize:"13px"}}>⚠ {eventAddMsg}</span>}
            </div>
            {eventPhotoLoading?<Spinner/>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"16px"}}>
              {eventPhotos.map(photo=>(
                <div key={photo.id} className="media-card">
                  <div style={{aspectRatio:"4/3",overflow:"hidden",background:"#f3f4f6"}}><img src={photo.src} alt={photo.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
                  <div style={{padding:"12px"}}>
                    <p style={{margin:"0 0 2px",fontSize:"13px",fontWeight:700,color:"#022C45"}}>{photo.title||"Untitled"}</p>
                    <p style={{margin:"0 0 10px",fontSize:"11px",color:"#9CA3AF"}}>{photo.desc}</p>
                    {eventDeleteConfirm===photo.id?(
                      <div style={{display:"flex",gap:"6px"}}>
                        <button onClick={()=>handleEventDelete(photo.id)} style={{flex:1,padding:"6px",borderRadius:"6px",border:"none",background:"#ef4444",color:"#fff",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Delete</button>
                        <button onClick={()=>setEventDeleteConfirm(null)} style={{flex:1,padding:"6px",borderRadius:"6px",border:"1px solid rgba(2,44,69,0.1)",background:"#fff",color:"#6B7280",fontSize:"11px",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
                      </div>
                    ):<button onClick={()=>setEventDeleteConfirm(photo.id)} className="del-btn" style={{width:"100%",textAlign:"center"}}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>}
          </div>
        )}

        {/* ══════════════ HERO EVENT SLIDE TAB ══════════════ */}
        {tab==="events-slide"&&(
          <div style={{maxWidth:"720px"}}>
            <div style={{marginBottom:"24px"}}>
              <h2 style={{fontSize:"20px",fontWeight:900,color:"#022C45",margin:"0 0 4px"}}>🎯 Hero Event Slide</h2>
              <p style={{fontSize:"13px",color:"#9CA3AF",margin:0}}>Control the upcoming event banner on the homepage hero section.</p>
            </div>
            {slideLoading?<Spinner/>:(
              <>
                <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"24px",marginBottom:"16px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"}}>
                    <div><label className="lbl">Event Badge / Tag</label><input className="ai" placeholder="e.g. Upcoming Webinar" value={slide.badge} onChange={e=>setSlide(s=>({...s,badge:e.target.value}))}/></div>
                    <div><label className="lbl">Event Title *</label><input className="ai" placeholder="e.g. UK University Fair 2026" value={slide.title} onChange={e=>setSlide(s=>({...s,title:e.target.value}))}/></div>
                    <div><label className="lbl">Date & Location</label><input className="ai" placeholder="e.g. 15 March 2026 · Delhi" value={slide.dateLocation} onChange={e=>setSlide(s=>({...s,dateLocation:e.target.value}))}/></div>
                    <div><label className="lbl">Button Text</label><input className="ai" placeholder="e.g. Register Now" value={slide.buttonText} onChange={e=>setSlide(s=>({...s,buttonText:e.target.value}))}/></div>
                  </div>
                  <div style={{marginBottom:"14px"}}><label className="lbl">Description</label><textarea className="at" rows={3} placeholder="Brief description of the event..." value={slide.description} onChange={e=>setSlide(s=>({...s,description:e.target.value}))}/></div>
                  <div><label className="lbl">Button Link</label><input className="ai" placeholder="e.g. /events/uk-fair or https://..." value={slide.buttonLink} onChange={e=>setSlide(s=>({...s,buttonLink:e.target.value}))}/></div>
                </div>
                <button onClick={handleSaveSlide} disabled={slideStatus==="loading"}
                  style={{width:"100%",padding:"15px",borderRadius:"12px",background:slideStatus==="loading"?"#9CA3AF":"#F16101",color:"#fff",border:"none",fontSize:"15px",fontWeight:800,cursor:slideStatus==="loading"?"not-allowed":"pointer",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"inherit",boxShadow:"0 8px 20px rgba(241,97,1,0.25)"}}>
                  {slideStatus==="loading"?"Saving...":"Save Hero Event →"}
                </button>
                {slideStatus==="success"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#16a34a",fontWeight:700}}>✓ {slideMsg}</p></div>}
                {slideStatus==="error"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#dc2626",fontWeight:700}}>⚠ {slideMsg}</p></div>}
              </>
            )}
          </div>
        )}

        {/* ══════════════ POPUP MODAL TAB ══════════════ */}
        {tab==="popup"&&(
          <div style={{maxWidth:"720px"}}>
            <div style={{marginBottom:"24px"}}>
              <h2 style={{fontSize:"20px",fontWeight:900,color:"#022C45",margin:"0 0 4px"}}>💬 Popup Modal Settings</h2>
              <p style={{fontSize:"13px",color:"#9CA3AF",margin:0}}>Control the website popup. Enable an announcement image to replace the normal contact form temporarily.</p>
            </div>
            <div style={{background:"#fff",borderRadius:"14px",border:"1px solid rgba(2,44,69,.07)",padding:"24px",marginBottom:"16px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px",flexWrap:"wrap",gap:"12px"}}>
                <div>
                  <p style={{fontSize:"14px",fontWeight:800,color:"#022C45",margin:"0 0 4px"}}>Announcement / Promo Image Mode</p>
                  <p style={{fontSize:"13px",color:"#9CA3AF",margin:0}}>When enabled, the popup shows your promo image instead of the contact form.</p>
                </div>
                <label style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",userSelect:"none"}}>
                  <div onClick={()=>setPopupConfig(c=>({...c,announcementEnabled:!c.announcementEnabled}))}
                    style={{width:"48px",height:"26px",borderRadius:"13px",background:popupConfig.announcementEnabled?"#F16101":"rgba(2,44,69,0.12)",position:"relative",transition:"background .25s",cursor:"pointer",flexShrink:0}}>
                    <div style={{position:"absolute",top:"3px",left:popupConfig.announcementEnabled?"24px":"3px",width:"20px",height:"20px",borderRadius:"50%",background:"#fff",transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,0.15)"}}/>
                  </div>
                  <span style={{fontSize:"13px",fontWeight:700,color:popupConfig.announcementEnabled?"#F16101":"#9CA3AF"}}>{popupConfig.announcementEnabled?"ENABLED":"DISABLED"}</span>
                </label>
              </div>
              {popupConfig.announcementEnabled&&(
                <div style={{background:"rgba(241,97,1,0.04)",border:"1px solid rgba(241,97,1,0.15)",borderRadius:"10px",padding:"16px",marginBottom:"16px"}}>
                  <p style={{fontSize:"12px",fontWeight:700,color:"#F16101",margin:"0 0 8px"}}>⚡ Announcement mode is ON — visitors will see your promo image instead of the contact form.</p>
                  <p style={{fontSize:"12px",color:"#9CA3AF",margin:0}}>Disable this toggle to revert back to the normal consultation popup.</p>
                </div>
              )}
              <div style={{marginBottom:"14px"}}>
                <label className="lbl">Promo / Announcement Image</label>
                <label style={{display:"block",cursor:"pointer"}}>
                  <div style={{border:"2px dashed rgba(2,44,69,0.15)",borderRadius:"12px",padding:"24px",textAlign:"center",background:"rgba(2,44,69,0.02)",cursor:"pointer"}}
                    onDragOver={e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="#F16101";}}
                    onDragLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";}}
                    onDrop={async e=>{e.preventDefault();(e.currentTarget as HTMLDivElement).style.borderColor="rgba(2,44,69,0.15)";const file=e.dataTransfer.files[0];if(!file)return;setPopupUploading(true);await uploadFile(file,"blogs",()=>{},(path)=>{setPopupConfig(c=>({...c,announcementImage:path}));setPopupUploading(false);},(err)=>{alert(err);setPopupUploading(false);});}}>
                    {popupUploading
                      ?<div><div style={{width:"28px",height:"28px",border:"3px solid rgba(2,44,69,0.1)",borderTop:"3px solid #F16101",borderRadius:"50%",margin:"0 auto 10px",animation:"spin 0.8s linear infinite"}}/><p style={{margin:0,fontSize:"13px",color:"#9CA3AF"}}>Uploading...</p></div>
                      :popupConfig.announcementImage
                        ?<div><img src={popupConfig.announcementImage} alt="" style={{maxHeight:"120px",maxWidth:"100%",borderRadius:"8px",marginBottom:"8px",objectFit:"contain"}}/><p style={{margin:0,fontSize:"12px",color:"#16a34a",fontWeight:700}}>✓ {popupConfig.announcementImage.split("/").pop()}</p><p style={{margin:"4px 0 0",fontSize:"11px",color:"#9CA3AF"}}>Click or drag to replace</p></div>
                        :<div><div style={{fontSize:"28px",marginBottom:"8px"}}>🖼</div><p style={{margin:"0 0 4px",fontSize:"14px",fontWeight:700,color:"#022C45"}}>Click to browse or drag & drop</p><p style={{margin:0,fontSize:"12px",color:"#9CA3AF"}}>Recommended: 800×500px JPG or PNG · Max 20MB</p></div>
                    }
                  </div>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;setPopupUploading(true);await uploadFile(file,"blogs",()=>{},(path)=>{setPopupConfig(c=>({...c,announcementImage:path}));setPopupUploading(false);},(err)=>{alert(err);setPopupUploading(false);});e.target.value="";}}/>
                </label>
                {popupConfig.announcementImage&&<p style={{fontSize:"12px",color:"#9CA3AF",margin:"8px 0 0"}}>Path: <code style={{color:"#F16101"}}>{popupConfig.announcementImage}</code></p>}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"14px"}}>
                <div><label className="lbl">Button / Click Link</label><input className="ai" placeholder="/contact or /book-consultation" value={popupConfig.announcementLink} onChange={e=>setPopupConfig(c=>({...c,announcementLink:e.target.value}))}/></div>
                <div><label className="lbl">Image Alt Text (SEO)</label><input className="ai" placeholder="Special Offer — Edification Overseas" value={popupConfig.announcementAlt} onChange={e=>setPopupConfig(c=>({...c,announcementAlt:e.target.value}))}/></div>
              </div>
            </div>
            {popupConfig.announcementEnabled&&popupConfig.announcementImage&&(
              <div style={{background:"#022C45",borderRadius:"14px",padding:"20px",marginBottom:"16px"}}>
                <p style={{fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1.5px",margin:"0 0 12px"}}>Preview — What visitors will see</p>
                <div style={{borderRadius:"10px",overflow:"hidden",aspectRatio:"16/10",position:"relative",background:"#e8ecf0"}}>
                  <img src={popupConfig.announcementImage} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              </div>
            )}
            <button onClick={handleSavePopup} disabled={popupStatus==="loading"}
              style={{width:"100%",padding:"15px",borderRadius:"12px",background:popupStatus==="loading"?"#9CA3AF":"#F16101",color:"#fff",border:"none",fontSize:"15px",fontWeight:800,cursor:popupStatus==="loading"?"not-allowed":"pointer",textTransform:"uppercase",letterSpacing:"1px",fontFamily:"inherit",boxShadow:"0 8px 20px rgba(241,97,1,0.25)"}}>
              {popupStatus==="loading"?"Saving...":"Save Popup Settings →"}
            </button>
            {popupStatus==="success"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#16a34a",fontWeight:700}}>✓ {popupMsg}</p></div>}
            {popupStatus==="error"&&<div style={{marginTop:"12px",padding:"12px 16px",background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"10px"}}><p style={{margin:0,fontSize:"13px",color:"#dc2626",fontWeight:700}}>⚠ {popupMsg}</p></div>}
          </div>
        )}

      </div>
    </main>
  );
}