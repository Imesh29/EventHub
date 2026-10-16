import { useEffect, useState } from 'react';
export function useMockDelay(ms=250){const [ready,setReady]=useState(false);useEffect(()=>{const id=setTimeout(()=>setReady(true),ms);return()=>clearTimeout(id)},[ms]);return ready;}
