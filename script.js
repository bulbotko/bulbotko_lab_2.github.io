// task_1
const blockX = document.getElementById('sec_1');
const blockY = document.getElementById('it_1');

function swapBlockInfo (block1, block2) {
    let tmp = block2.textContent
    block2.textContent = block1.textContent
    block1.textContent = tmp
}

blockX.onclick = () => swapBlockInfo(blockX,blockY)
blockY.onclick = () => swapBlockInfo(blockX,blockY)

//task_2
const radius = 5;
const text = document.getElementById('square');
text.textContent = "S = π*R*R = π"+"*"+radius+"*"+radius; 
text.onclick = () => {
    let area = Math.PI * Math.pow(radius, 2);
    let temp = " = " + area.toString();
    if (!text.textContent.endsWith(temp)) text.textContent += temp;
}

// Задание 3
var choice = false;
var delete_ = "no";
document.getElementById('calculate').onclick = () => findCount();

function findCount() {
	let form = document.forms.calculator;
	let elem = form.elements.numbers;		
	let arr = elem.value.split(",").map(Number);
    let count = 0;
	let maxNum = Number.MIN_VALUE;
	
	for (i = 0; i < arr.length;i++) {		
		if (arr[i] > maxNum) maxNum=arr[i]
	}
	for (i = 0; i < arr.length; i++)
    {
        if (arr[i] === maxNum) count++
    }
	if(choice == false)
	{
		document.cookie = "Max_Number=" + maxNum.toString();
		document.cookie = "Count_Of_Numbers=" + count.toString();
	alert(
		"Max: " + maxNum + "\n" +
        "Count: " + count
	);
	choice = true;
	}
	else if(choice == true)
	{
		delete_ = prompt(document.cookie + "\n Delete cookies? (yes or no)");
		if (delete_ === "yes")
		{
			CookiesDelete();
			alert("Cookies were deleted");
		}
		else if (delete_ === "no")
		{
			alert("Кукі не було видалено. Перезавантажте, будь ласка, сторінку");
		}
	}

	function CookiesDelete() {
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
			document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
}
// task_4
document.querySelector('.block_2').addEventListener('blur', () =>  {
    SelectColor()
})

document.querySelector('.block_2').style.backgroundColor =
    localStorage.getItem('favcolor') ?? document.querySelector('.block_2').style.backgroundColor

function SelectColor() {
    let color = document.querySelector('#favcolor').value

    document.querySelector('.block_2').style.backgroundColor = color
    localStorage.setItem('favcolor', color)
}

//task_5

document.querySelectorAll('.editable').forEach((el) => {
    el.addEventListener('dblclick', (event) => {
        let savedInfoKey = event.target.id + "-original-version"
        let topBlockId = '#' + event.target.id

        let targetElemInnerHtml = event.target.innerHTML

        let textarea = document.createElement('textarea')
        textarea.innerText = targetElemInnerHtml

        let btnCancel = document.createElement('input')
        btnCancel.type = 'submit'
        btnCancel.value = 'Delete'
        btnCancel.onclick = () => {
            if (localStorage.getItem(savedInfoKey) !== null) {
                localStorage.removeItem(savedInfoKey)
            }
            event.target.innerHTML = targetElemInnerHtml
        }

        let btnSubmit = document.createElement('input')
        btnSubmit.type = 'submit'
        btnSubmit.value = 'Save'
        btnSubmit.onclick = () => {
            event.target.innerHTML = textarea.value
            localStorage.setItem(savedInfoKey, targetElemInnerHtml)

            let rollbackBtn = document.createElement('input')
            rollbackBtn.type = 'submit'
            rollbackBtn.value = 'Rollback'
            rollbackBtn.addEventListener('click', (event) => {
                let target = event.target

                document.querySelector(topBlockId).innerHTML = localStorage.getItem(savedInfoKey)
                localStorage.removeItem(savedInfoKey)
            })

            event.target.appendChild(rollbackBtn)
        }

        event.target.appendChild(document.createElement('br'))
        event.target.appendChild(document.createElement('br'))
        event.target.appendChild(textarea)
        event.target.appendChild(btnCancel)
        event.target.appendChild(btnSubmit)
    })
})
