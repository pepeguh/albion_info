async function goldFetch(){
        let response= await fetch('https://east.albion-online-data.com/api/v2/stats/Gold?count=10');
        let summ=0;
        let i=0;
        if (response.ok){
            let ans= await response.json()
            
            for( i=0;i<ans.length;i++){
                 summ=summ+ans[i].price
            }
            ans = (summ/i).toFixed(0)
            return ans
        }else{
            
            console.log("Ошибка запроса цены золота: " + response.status)
        return ("error, try again")
        }}

export default goldFetch