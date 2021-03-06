require(['./config'],()=>{
    require(['header','log','template','jquery'],(header,log,template)=>{
        class List{
            constructor(){
                this.logNowCon =$('.logNowCon');
                this.li=$('.listName li');
                this.pages =$('.pages')
                console.log("NE")
                this .init();
                this.bindEvents()
            }
            bindEvents(){
                this.pages.on('click',(e)=>{
                    var data=+e.target.getAttribute('data-index')
                    console.log(data)
                    $.get('/api/ps/product/list',{
                        merchantId:1,page:data,
                        pageSize:40,
                    },resp=>{
                        const html = template('dataTemplate',{
                            list:resp.data.productList
                        });
                        $(".construction").html(html)
                        localStorage.setItem('pages',data-1);
                        $('.pages span').attr('class','')
                        $('.pages span').eq(localStorage.getItem('pages')).attr('class','active')
                        
                    },'json')
                })
                $('.up').on('click',()=>{
                    var data=+localStorage.getItem('pages')-1;
                    if(data<0){
                        data=+this.numPages-1
                    }
                    $.get('/api/ps/product/list',{
                        merchantId:1,page:data,
                        pageSize:40,
                    },resp=>{
                        const html = template('dataTemplate',{
                            list:resp.data.productList
                        });
                        $(".construction").html(html)
                        localStorage.setItem('pages',data);
                        $('.pages span').attr('class','')
                        $('.pages span').eq(data).attr('class','active')
                        
                    },'json')
                })
                $('.down').on('click',()=>{
                    var data=+localStorage.getItem('pages')+1;
                    if(data>this.numPages-1){
                        data=0
                    }
                    $.get('/api/ps/product/list',{
                        merchantId:1,page:data,
                        pageSize:40,
                    },resp=>{
                        const html = template('dataTemplate',{
                            list:resp.data.productList
                        });
                        $(".construction").html(html)
                        localStorage.setItem('pages',data);
                        $('.pages span').attr('class','')
                        $('.pages span').eq(data).attr('class','active')
                        
                    },'json')
                })
            }
            init(){
                $('header').load('/html/modules/header.html');
                setTimeout(()=>{
                    if(document.cookie){
                        new header().init();
                    }else(new header())
                    new log()
                },100)
                $(this.logNowCon).load("/html/modules/log.html")
                $('footer').load('/html/modules/footer.html');
                $.get('/api/ps/product/list',{
                    merchantId:1,page:1,
                    pageSize:40,
                },resp=>{
                    const html = template('dataTemplate',{
                        list:resp.data.productList
                    });
                    $(".construction").html(html)
                    this.numPages =Number.parseInt(resp.data.totalCount/40)+1
                    for(var i=1;i<=this.numPages;i++){
                            this.pages.append(`<span data-index=${i}>${i}</span>`)
                    }
                    if(localStorage.getItem('pages')){
                        $('.pages span').eq(localStorage.getItem('pages')).attr('class','active')
                    }else{
                    localStorage.setItem('pages',0);
                    $('.pages span').eq(localStorage.getItem('pages')).attr('class','active')
                        $('.pages span').eq(localStorage.getItem('pages')).attr('class','active')
                    }
                    
                },'json')
            }
        }
        new List()
    })
})