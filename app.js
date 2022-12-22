let myObject = {name: "Abdulsamad", nickname: "Amusane", fullName: function(){
    console.log(this.name,this.nickname);
}}

window.addEventListener('load', updateUi);

const form = document.forms['form'];
const insert_button = form.querySelector('button');

const updateForm = document.forms['update_form'];
const updateButton = document.getElementById('update');

var tbody = document.getElementById('data')


insert_button.addEventListener('click', (e) => {
    e.preventDefault();

    let exp_type = document.getElementById('exp_type').value;
    let amount = document.getElementById('amount').value;
    let date = document.getElementById('date').value;

    let dataArray = {"expense_date": date, "expense_type": exp_type, "expense_amout": amount};

    if(window.localStorage.getItem('expenses')){
        let data = window.localStorage.getItem('expenses');
        let parsedData = JSON.parse(data);
        parsedData.push(dataArray);
        
        window.localStorage.setItem('expenses', JSON.stringify(parsedData));
        updateUi();
    }else{
        let newArray = [];
        newArray.push(dataArray);
        let stringArray = JSON.stringify(newArray);
        window.localStorage.setItem('expenses', stringArray);
        updateUi();
    }

    


})

function updateUi(){
    let fetched_data = JSON.parse(window.localStorage.getItem('expenses'));

    let tr_temp = '';
    for(i = 0;i < fetched_data.length; i++){
        // if(fetched_data[i].expense_type == '') fetched_data[i].expense_type = null;
        // if(fetched_data[i].expense_date == '') fetched_data[i].expense_date = null;
        // if(fetched_data[i].expense_amout == '') fetched_data[i].expense_amout = null;
        tr_temp += ` <tr>
                        <td>${fetched_data[i].expense_date}</td>
                        <td>${fetched_data[i].expense_type}</td>
                        <td>${fetched_data[i].expense_amout}</td>
                        <td>
                            <span class="btn btn-sm btn-primary" onClick="updateData(${i},'${fetched_data[i].expense_date}','${fetched_data[i].expense_amout}','${fetched_data[i].expense_type}')" data-bs-toggle="modal" data-bs-target="#updateModal">update</span>
                            <span class="btn btn-sm btn-danger" onClick="deleteExpense(${i})">delete</span>
                        </td>
                    </tr>`
    }

    tbody.innerHTML = tr_temp;
}

function updateData(index,date,amount,type){
    // if(type == 'undefined'){
    //     alert('notdefined')
    // }
    let options = updateForm.getElementsByTagName('option');
    Array.from(options).forEach(option => {
        if(option.value == type){
            option.setAttribute('selected','selected');
        }else{
            option.removeAttribute('selected');
        }
    });
    
    // let amount_input = updateForm.querySelector('#exp_amount_update');
    // let date_input = updateForm.querySelector('#exp_date_update');
    
    updateForm.querySelector('#index').value = index;
    updateForm.querySelector('#exp_amount_update').value = amount;
    updateForm.querySelector('#exp_date_update').value = date;

}

function deleteExpense(index){
    let expenses = JSON.parse(window.localStorage.getItem('expenses'));
    
    expenses.splice(index,1);
    let editedData = JSON.stringify(expenses);
    window.localStorage.setItem('expenses', editedData);

    updateUi();
}

updateButton.addEventListener('click', () => {
    let index = updateForm.querySelector('#index').value;
    let date = updateForm.querySelector('#exp_date_update').value;
    let amount = updateForm.querySelector('#exp_amount_update').value;
    let type = updateForm.querySelector('#exp_type_update').value;
    
    let expenses = JSON.parse(window.localStorage.getItem('expenses'));

    expenses[index].expense_type = type;
    expenses[index].expense_date = date;
    expenses[index].expense_amout = amount;

    let updatedData = JSON.stringify(expenses);
    window.localStorage.setItem('expenses', updatedData);

    updateUi();
    $('#updateModal').modal('hide');


    
})

