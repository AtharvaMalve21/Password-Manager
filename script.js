// console.log("Working...") ;

function maskPassword(pass) {
    let str = "" ;

    for(let i=0; i<pass.length; i++) {
        str+="*" ;
    }
    return str  ;
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed") ;
        },
      );
  }
const removePassword = (website) => {
    let data = localStorage.getItem("passwords") ;
    let arr = JSON.parse(data) ;
    arrUpdated = arr.filter((e) => {
        return e.website !=website ;
    }) ;
    localStorage.setItem("passwords", JSON.stringify(arrUpdated)) ;
    alert(`Successfully deleted ${website}'s password`) ;
    showPasswords() ;
}

const showPasswords = () => {
    let tb = document.querySelector('table') ;

    let data = localStorage.getItem("passwords") ;

    if(data==null || JSON.parse(data).length==0) {
        tb.innerHTML = "No data to Show" ;
    }

    else {
        tb.innerHTML = ` <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`
        
        let arr = JSON.parse(data) ;
        let str = "" ;
    for(let i=0; i<arr.length; i++) {
        const element = arr[i] ;

        str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="assests/copy.svg" alt="Copy Button" width="10" height="10">
                </td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="assests/copy.svg" alt="Copy Button" width="10" height="10">
                </td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="assests/copy.svg" alt="Copy Button" width="10" height="10">
                </td>
                <td><button class="d-1" onclick="removePassword('${element.website}')">Delete</button></td>
        </tr>`
            }
            tb.innerHTML+= str ;
    }
    website.value = "" ;
    username.value = "" ;
    password.value = "" ;
}

showPasswords() ;

let b = document.querySelector('.btn') ;

b.addEventListener('click',(e) => {
    e.preventDefault() ;
    console.log("Clicked...") ;
    console.log(username.value, password.value) ;

    let passwords = localStorage.getItem("passwords") ;
    console.log(passwords) ;

    if(passwords==null) {
        let json = [] ;
        json.push({website: website.value, username: username.value, password: password.value}) ;
        alert("Password Saved") ;
        localStorage.setItem("passwords", JSON.stringify(json)) ;
    }

    else {
        let json = JSON.parse(localStorage.getItem("passwords")) ;
        json.push({website:website.value, username:username.value, password: password.value}) ;
        alert("Password Saved") ;
        localStorage.setItem("passwords", JSON.stringify(json)) ;
    }

        showPasswords() ;
}) ;














































// class Password {
//     constructor() {
//         console.log("Generating Password") ;
//         this.password = "" ;
//     }

//     generatePassword(len) {
//         if(len<3) {
//             console.log("Your password should be atleast 3 characters long...") ;
//             return null ;
//         }

//         else {
//             let numbers = "0123456789" ;
//             let symbols = "$#!@*&^?" ;
//             let chars = "abcdefghijklmnopqrstuvwxyz" ;

//             let i=0 ;
//             while(i<len) {
//                 this.password+= chars[Math.floor(Math.random()*chars.length)] ;
//                 this.password+= symbols[Math.floor(Math.random()*symbols.length)] ;
//                 this.password+= numbers[Math.floor(Math.random()*numbers.length)] ;
//                 i++ ;
//             }
//             this.password = this.password.substring(0,len) ;
//         }

//         return this.password ;

//     }
// } ;

// let p = new Password() ;

// console.log(`New password generated is ${p.generatePassword(10)}.`) ;   