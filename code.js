export function adjustBrightness(color, factor) {
  if(!color || Number.isNaN(factor))
  {
    return null;
  }

  const clamp =(a,b,c)=>{
    if(a<b)
    {
      return b;
    }else if(a>c)
    {
      return c;
    }else{
      return a;
    }
  }

  const ans = {};
  ans.name= color.name;
  for(const key in color)
  {
     if(typeof color[key]==='string')
    {
      continue;
    }
    ans[key] = Math.round(clamp(color[key]*factor,0,255));
  }
  return ans;
}

adjustBrightness({},'dkjdk');
console.log(adjustBrightness(null,'dkjdk'));