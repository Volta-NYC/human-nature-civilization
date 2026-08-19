"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function RouteAtmosphere(){const pathname=usePathname();const route=pathname==="/"?"home":pathname.split("/")[1]||"home";useEffect(()=>{document.body.dataset.route=route;return()=>{delete document.body.dataset.route;}},[route]);return <div className="route-atmosphere" aria-hidden="true"><span/><span/><span/></div>}
