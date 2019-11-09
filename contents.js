
const url = whale.runtime.getURL(`images/share_button.png`);
console.log(url);
const img = document.createElement('img')
img.src = url;
img.style = "z-index: 100000!important; position: fixed!important; right: 13px!important; bottom: 80px!important;  height: 60px !important; width: auto !important; cursor: pointer !important;"
img.id= 'shareButton'
document.body.appendChild(img);


const url2 = whale.runtime.getURL(`images/memo_button.png`);
const img2= document.createElement('img')
img2.src = url2;
img2.style = "z-index: 100000 !important; position: fixed!important; right: 13px!important; bottom: 23px!important;  height: 60px !important; width: auto !important; cursor: pointer !important;"
img2.id = 'memoButton'
document.body.appendChild(img2);


const memo_bg = whale.runtime.getURL(`images/memobg.png`);
const container = document.createElement('div')
container.innerHTML = `
    <div class = "memo_box">
            <div class = "memo_bottom_in">
                <div class = "memo_text_area" >
                    <textarea class = "memo_text" id="memo_area" name="메모입력" rows="1" cols="1" placeholder="메모를 입력하세요."></textarea>
                    <div class = "memo_submit_button">
                        <input class = "submit_button" type="submit" id="memo_submit" value="저장"/>
                        <input class = 'cancel_button2' type="submit" value="취소"/>
                    </div>
                </div>
            </div>
    </div>
`

// 처음 윈도우 켰을 때 메모 팝업 내용 X //

window.addEventListener('load', (event) => {
    const noPopup = document.querySelector('.memo_box');
    noPopup.style.display = 'none'
});



document.body.appendChild(container);

const cancelButton2 = document.querySelector('.cancel_button2')
cancelButton2.addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'none'
    const memoReset = document.querySelector('.memo_text')
    memoReset.value = memoReset.defaultValue;
})

const submitButton = document.querySelector('.submit_button')
submitButton .addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'none'
})


const memoButton = document.querySelector("#memoButton")
memoButton.addEventListener('click', () => {
    const memoBox = document.querySelector('.memo_box')
    memoBox.style.display = 'block'
})

var memo_url;
var memo_content;



document.getElementById('memo_submit').addEventListener('click',function(){
    var encrypt;
    memo_url = String(window.location.href);
    memo_content= String(document.getElementById('memo_area').value);
    whale.storage.sync.get('site', result => {
        // console.log(result.site)
        encrypt=result.site
        // console.log(encrypt)
        whale.storage.sync.get('uid', result => {
            console.log(encrypt)
            
            fetch(`https://still-anchorage-85470.herokuapp.com/memo/${encrypt}/`, {
                method: 'POST',
                body: JSON.stringify({"url": memo_url, "content": memo_content, "uid": result.uid}),
                headers:{
                    'Content-Type': 'application/json'
                }
                }).then(res => {
                    return res.json()
                }).then(resJSON => {
                    console.log(resJSON)               
            })
        });
    })

    const memoReset = document.querySelector('.memo_text')
    memoReset.value = memoReset.defaultValue;

    whale.runtime.sendMessage(`new_memo`, function() {
    });
    
})


//공유하기 버튼//
document.getElementById('shareButton').addEventListener('click',function(){
    const url = String(window.location.href);
    var encrypt; 

    whale.storage.sync.get('site', result => {
        // console.log(result.site)
        encrypt=result.site
        // console.log(encrypt)
        whale.storage.sync.get('uid', result => {
            console.log(encrypt)
            
            fetch(`https://still-anchorage-85470.herokuapp.com/share/${encrypt}/`, {
    
                method: 'POST',
                body: JSON.stringify({"url": url, "uid": result.uid}),
                headers:{
                    'Content-Type': 'application/json'
                }
                }).then(resJSON => {
                   
                    
                    console.log(resJSON) 
            })
        });
        

    })
    whale.runtime.sendMessage(`shared`, function() {
    });
    
})



