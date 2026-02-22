/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */






export function createFestivalManager() {
  const festivals =[];

function addFestival(name, date, type){
  if(!name || typeof name !=='string' || name.length===0 ||
     !date || typeof date !=='string' || date.length===0 ||
     !type || typeof type !=='string' || type.length===0 ||
     (type!=="religious" && type!== "national" && type!== "cultural") ||
    festivals.find(el=>el.name===name))
  {
    return -1;
  }else{
    festivals.push({
      name,date,type
    });
    return festivals.length;
  }
}

function removeFestival(name){
  if(festivals.find(el=>el.name===name))
  {
    const festivalid = festivals.findIndex(el=>el.name===name);
    festivals.splice(festivalid,1);
    return true;
  }else{
    return false;
  }
}

function getAll(){
  return structuredClone(festivals);
}

function getByType(type){
  return festivals.filter(el=>el.type===type);
}

function getUpcoming(currentDate, n = 3){
  currentDate = Date.parse(currentDate);

  const ans = festivals
  .filter(el=>currentDate<=Date.parse(el.date))
  .sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));

  return ans.slice(0,n);
}

function getCount(){
  return festivals.length;
}


  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount
  }
}
