const cb_attributes = [
    ['数学','cb1'],
    ['物理','cb2'],
    ['プログラミング','cb3'],
    ['ネットワーク','cb4'],
    ['C','cb5'],
    ['C++','cb6'],
    ['Lisp','cb7'],
    ['セキュリティ','cb8'],
    ['OS','cb9'],
];

const once = {
    once : true
};

function e_createCheckbox(name,value,id){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = name;
    checkbox.value = value;
    checkbox.id = id;
    return checkbox;
}
function e_createFile(id){
    let file = document.createElement('input');
    file.type = 'file';
    file.id = id;
    return file;
}

function e_createLabel(value,id_for){
    let label = document.createElement('label');
    let tmp = document.createAttribute(id_for);
    tmp.value = value;
    label.setAttributeNode(tmp);
    return label;
}

function e_createDiv(attr,class_name){
    let div = document.createElement('div');
    let tmp = document.createAttribute(attr);
    tmp.value = class_name;
    div.setAttributeNode(tmp);
    return div;
}

function e_createSubmit(value,id){
    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = value;
    submit.id = id;
    return submit;
}
function e_createButton(value,id){
    let button = document.createElement('input');
    button.type = 'button';
    button.value = value;
    button.id = id;
    return button;
}
function clear_file(){
    let file = document.getElementById('f1');
    file.value = "";
}
function all_check_clear(){
    var keys = document.getElementsByName('key');
    for(var i = 0,len = keys.length; i < len;i++){
        var key = keys.item(i);
        if(key.checked){
            key.checked = false;
        }
    }
}
//アップロードフォーム出現
document.addEventListener('DOMContentLoaded',function(){
    //キーワード検索
    $("#form2").on("click", 'button[type="button"]', function(e){
        e.preventDefault();
        var formData = new FormData();
        var text = document.getElementById('sbox2');
        formData.append('key', text.value);
        $.ajax({
            url: 'php/search.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'html',
            complete: function(){},
            success: function(res) {
                var photo = document.getElementsByClassName('grid');
                if(!res){
                    photo[0].innerHTML = "<p>一致するキーワードはありません</p>";
                } else {
                    photo[0].innerHTML = res;
                }
            }
        })
    });
    document.getElementById('btn').addEventListener('click',function(){
        const cb_element_array = [];
        const l_element_array = [];
        const d_element_array = [];

        let file = e_createFile('f1');
        let div = e_createDiv('class','checkboxes');
        for(var attribute of cb_attributes){
            d_element_array.push(e_createDiv('class','box'));
            cb_element_array.push(e_createCheckbox('key',attribute[0],attribute[1]));
            l_element_array.push(e_createLabel(attribute[1],'for'));
        }
        for(var i = 0;i < cb_element_array.length;i++){
            l_element_array[i].appendChild(document.createTextNode(cb_attributes[i][0]));
            d_element_array[i].appendChild(cb_element_array[i]);
            d_element_array[i].appendChild(l_element_array[i]);
            div.appendChild(d_element_array[i]);
        }
        let div_s = e_createDiv('id','d_submit');
        div_s.appendChild(e_createButton('送信','ul'));
        div_s.appendChild(e_createDiv('id','msg'));

        var io_form = document.getElementById('inner-io-form');
        io_form.appendChild(file);
        io_form.appendChild(div);
        io_form.appendChild(div_s);

        // JQueryでajax実装
        // 画像ファイルをアップロード
        $("#inner-io-form").on("change", 'input[type="file"]', function(e){
            e.preventDefault();
            var formData = new FormData();
            var files = this.files;
            $.each(files, function(i, file){
                formData.append('file', file);
    	    });
    	    $.ajax({
                url: 'php/save_file.php',
    		    type: 'post',
    		    data: formData,
    		    processData: false,
    		    contentType: false,
    		    dataType: 'html',
    		    complete: function(){},
    		    success: function(res) {}
    	    })
            .done(function(data) {
                console.log(data);
            })
        });

        // チェックボックス、ファイル情報送信
        document.getElementById('ul').addEventListener('click',function(){
            var result_msg = document.getElementById('msg');
            var photo = document.getElementsByClassName('grid');
            var file = document.getElementById('f1').files[0];
            var checkboxes = [];
            var keys = document.getElementsByName('key');

            for(var i = 0,len = keys.length; i < len;i++){
                var key = keys.item(i);
                if(key.checked){
                    checkboxes.push(key.value);
                }
            }
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        result_msg.textContent = 'アップロードしました';
                        clear_file();
                        all_check_clear();
                        photo[0].innerHTML = xhr.responseText;
                    } else {
                        result_msg.textContent = 'サーバーエラーが発生しました';
                    }
                } else {
                    result_msg.textContent = "送信中...";
                }
            };
            if(file === undefined){
                result_msg.textContent = '画像が選択されていません';
            } else if(checkboxes[0] === undefined){
                result_msg.textContent = '１つ以上キーワードを選択してください';
            } else {
                xhr.open('POST','php/upload.php',true);
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');

                var p_data = 'file_name=' + encodeURIComponent(file.name) + '&key=';
                for(var i = 0,len = checkboxes.length;i < len;i++){
                    p_data += encodeURIComponent(checkboxes[i]);
                    if(i === (len-1)){
                        break;
                    }
                    p_data += ',';
                }
                xhr.send(p_data);
            }
        },false);
    },once);
},false);
