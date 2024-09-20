export async function customFetch(url: string, method : string = 'GET', contents : any = null) {
    let body = (contents && method !== 'GET') ? JSON.stringify(contents) : null;
    let headers = {'Content-Type': 'application/json',};
    return await fetch(url, {method,headers,body}).then(r=>r.json())
        .catch(e=>{console.log(e); 
                    return Response.json({ status: false, reason: 'Internal Server Error' });
        });
}