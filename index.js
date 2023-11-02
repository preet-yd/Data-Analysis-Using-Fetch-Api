const apiUrl = 'https://one00x-data-analysis.onrender.com/assignment';
const email = 'preet.yadav266@gmail.com';
let assignment_id;
fetch(apiUrl + '?email=preet.yadav266@gmail.com', {method: 'GET'})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const assignment_id = response.headers.get("x-assignment-id");
    console.log("inside header assignment_id " + assignment_id);
    return response.json();
})
.then(data => {
    let arr = data;
    let freq = 0;
    let result = "";
    let n = arr.length;
    
    for(let i=0;i<n;i++){
        let count = 0;
        for(let j=i+1;j<n;j++){
            if(JSON.stringify(arr[j]) === JSON.stringify(arr[i])){
                count++;
            }
        }
        if(count>=freq){
            result = arr[i];
            freq = count;
        }
    }   
    console.log("The word that occurs most is : " + result);
    console.log("No of times: " + freq);
    // console.log("inside header in data " + assignment_id);

    const postData = {
        'assignment-id': assignment_id,
        'mostOccurredWord': result,
    }

    fetch(apiUrl,{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            
        },
        body : JSON.stringify(postData)
    })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response not ok while posting data')
            }
            return response.json();
        })
        .then(responseData =>{
            console.log('Data uploaded successfully:', responseData);
        })
        .catch(error => {
            console.error('Error uploading data:', error);
          });
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });