/** Illustrative branch content for the frontend pitch, never live offers. */
export const campExperiences: Record<string,{special:string;specialImage:string;specialDescription:string;menuSearch:string;event:string;eventImage:string;eventDescription:string;when:string}> = {
  "cauayan-d1":{special:"A latte & a little cake",specialImage:"cake-biscoff-cheesecake-slice",specialDescription:"A coffee-and-cake pairing to feature at the main camp.",menuSearch:"Biscoff",event:"Coffee, up close",eventImage:"coffee-latte-art-pour",eventDescription:"A small bar-side latte art session with the crew.",when:"Saturday · 3–4 PM"},
  "cauayan-sf":{special:"Lunch with your people",specialImage:"food-cabin-clubhouse-sandwich",specialDescription:"A clubhouse sandwich spotlight for a working lunch.",menuSearch:"Cabin Clubhouse",event:"Ideas around the table",eventImage:"branch-cauayan-sf-conference-room",eventDescription:"A community coworking morning in the private room.",when:"Wednesday · 9–11 AM"},
  santiago:{special:"The late-night cup",specialImage:"coffee-hot-americano",specialDescription:"A classic Americano spotlight for the camp that stays up.",menuSearch:"Americano",event:"After-hours sketch club",eventImage:"interior-communal-table",eventDescription:"Bring a sketchbook, grab a cup, and draw in good company.",when:"Friday · 8–10 PM"},
  tuguegarao:{special:"Something green",specialImage:"matcha-mango",specialDescription:"A mango matcha feature to welcome you to the newest camp.",menuSearch:"Mango",event:"Meet your new camp",eventImage:"exterior-green-door-entrance",eventDescription:"A relaxed meet-the-crew afternoon for new neighbors.",when:"Sunday · 2–4 PM"},
  ilagan:{special:"Brunch, a little later",specialImage:"food-loco-moco",specialDescription:"Loco Moco gets a moment on this camp’s feature board.",menuSearch:"Loco Moco",event:"A slow Sunday",eventImage:"interior-lounge-bear-window",eventDescription:"A quiet book swap. Bring a book you’d love someone else to read.",when:"Sunday · 10 AM–12 PM"},
  roxas:{special:"Your afternoon slice",specialImage:"cake-dark-chocolate",specialDescription:"Dark Chocolate Cake, ready for a coffee pairing feature.",menuSearch:"Dark Chocolate",event:"Roxas, through your lens",eventImage:"coffee-iced-latte-outdoor",eventDescription:"A small photo walk and a catch-up over coffee afterwards.",when:"Saturday · 4–5 PM"},
  alicia:{special:"A proper lunch break",specialImage:"food-crispy-huntsman-chop",specialDescription:"Crispy Huntsman Chops as the camp’s kitchen spotlight.",menuSearch:"Crispy Huntsman",event:"Friends at the long table",eventImage:"staff-kitchen-team-02",eventDescription:"A board game afternoon. Bring your people or meet a few new ones.",when:"Sunday · 3–5 PM"},
};
/** Area centers only. Exact shop pins must be verified with the owner. */
export const campLocations: Record<string,{center:[number,number];source:string}> = {
  tuguegarao:{center:[121.7535,17.6503],source:"https://ungegn.un.org/dashboard/cities/details?id=3176"},
  ilagan:{center:[121.8894,17.1489],source:"https://cityofilagan.gov.ph/index.php/facts/"},
  roxas:{center:[121.62,17.12],source:"https://en.wikipedia.org/wiki/Roxas,_Isabela"},
  "cauayan-d1":{center:[121.7686,16.9325],source:"https://www.philatlas.com/luzon/r02/isabela/cauayan/district-i.html"},
  "cauayan-sf":{center:[121.7609,16.9363],source:"https://www.philatlas.com/luzon/r02/isabela/cauayan/san-fermin.html"},
  alicia:{center:[121.6972,16.7787],source:"https://en.wikipedia.org/wiki/Alicia,_Isabela"},
  santiago:{center:[121.5446,16.6875],source:"https://www.philatlas.com/luzon/r02/isabela/santiago.html"},
};
export function distanceKm(a:[number,number],b:[number,number]) {
  const rad=Math.PI/180,dLat=(b[1]-a[1])*rad,dLon=(b[0]-a[0])*rad;
  const h=Math.sin(dLat/2)**2+Math.cos(a[1]*rad)*Math.cos(b[1]*rad)*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
}
