var app=require('../../app/CMS/app1');  // upload file, get a tmp url for a file, upload it on amazon s3, start conversion, conversion should be successfull
var app2=require('../../app/CMS/app2');
var log=require('../../ext/Logger');

describe('Content Library Test Suite I', function() {

    var ws_cons=[];  // web socket connections
    var l=-1; // for counting the web socket connections

    it('verify for a pdf file, get a tmp url for a pdf file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

			this.timeout(300000);
				log.info({"TC":'verify for a pdf file, get a tmp url for a pdf file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
				app('a1','aaaa', 'test.pdf', function(a,ws,msg) {

				if(ws)
					ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
				if(a==1) {
									done();
				}
				else {
								done(msg);
				}
			})
    })  // end of it block

    it('verify for a csv file, get a tmp url for a csv file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a csv file, get a tmp url for a csv file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a2','aaaa', 'test.csv', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    }) // end of it block

    it('verify for a doc file, get a tmp url for a doc file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a doc file, get a tmp url for a doc file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a3','aaaa', 'test.doc', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a docx file, get a tmp url for a docx file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for, docx file, get a tmp url for a docx file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a4','aaaa', 'test.docx', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a ppt file, get a tmp url for a ppt file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a ppt file, get a tmp url for a ppt file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a5','aaaa', 'test.ppt', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a pptx file, get a tmp url for a pptx file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for, pptx file, get a tmp url for a pptx file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a6','aaaa', 'test.pptx', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a xls file, get a tmp url for a xls file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a xls file, get a tmp url for a xls file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a7','aaaa', 'test.xls', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a xlsx file, get a tmp url for a xlsx file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a xlsx file, get a tmp url for a xlsx file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a8','aaaa', 'test.xlsx', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a xml file, get a tmp url for a xml file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a xml file, get a tmp url for a xml file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a9','aaaa', 'test.xml', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a txt file, get a tmp url for a txt file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a txt file, get a tmp url for a txt file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a10','aaaa', 'test.txt', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a html file, get a tmp url for a html file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a html file, get a tmp url for a html file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a11','aaaa', 'test.html', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

   it('verify for a htm file, get a tmp url for a htm file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a htm file, get a tmp url for a htm file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a12','aaaa', 'test.htm', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

   it('verify for a pps file, get a tmp url for a pps file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a pps file, get a tmp url for a pps file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a13','aaaa', 'test.pps', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a jpg file, get a tmp url for a jpg file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a jpg file, get a tmp url for a jpg file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a14','aaaa', 'test.jpg', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

   it('verify for a png file, get a tmp url for a png file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a png file, get a tmp url for a png file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a15','aaaa', 'test.png', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

   it('verify for a gif file, get a tmp url for a gif file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a gif file, get a tmp url for a gif file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a16','aaaa', 'test.gif', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a bmp file, get a tmp url for a bmp file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a bmp file, get a tmp url for a bmp file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a17','aaaa', 'test.bmp', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('verify for a rtf file, get a tmp url for a rtf file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify for a rtf file, get a tmp url for a rtf file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a18','aaaa', 'test.rtf', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it("verify full conversion process for a pdf file , where filename contains space, for example 'space space.pdf'", function(done) {

	this.timeout(600000);
	log.info({"TC":"verify full conversion process for a pdf file, where filename contains space, for example 'space space.pdf'"},'Test Case')
	app('a19','aaaa', 'space space.pdf', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it("verify full conversion process for a doc file , where filename contains space, for example 'space space.doc'", function(done) {

	this.timeout(600000);
	log.info({"TC":"verify full conversion process for a doc file, where filename contains space, for example 'space space.doc'"},'Test Case')
	app('a20','aaaa', 'space space.doc', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it("verify full conversion process for a pdf file , where filename starts with a special character $, for example '$test.pdf'", function(done) {

	this.timeout(600000);
	log.info({"TC":"verify full conversion process for a pdf file, where filename starts with a special character $, for example '$test.pdf'"},'Test Case')
	app('a21','aaaa', '$test.pdf', function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

	it("verify full conversion process for a pdf file , where filename start with special character #, for example '#test.pdf'", function(done) {

		this.timeout(600000);
		log.info({"TC":"verify full conversion process for a pdf file, where filename contains only special characters, for example '#test.pdf'"},'Test Case');
		app('a22','aaaa', '#test.pdf', function(a,ws,msg) {

		    if(ws)
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		    if(a==1) {
			done();
		    }
		    else {
			done(msg);
		    }
		})
	    })

	it("verify full conversion process for a pdf file , where filename contains only special characters, for example '#$@^&.pdf'", function(done) {

		this.timeout(600000);
		log.info({"TC":"verify full conversion process for a pdf file, where filename contains only special characters, for example '#test.pdf'"},'Test Case');
		app('a23','aaaa', '#$@^&.pdf', function(a,ws,msg) {

		    if(ws)
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		    if(a==1) {
			done();
		    }
		    else {
			done(msg);
		    }
		})
	    })

    it('verify, send a get-content request, in response it should list all the content', function(done) {

	this.timeout(600000);
	log.info({"TC":'verify send a get-content request, in response it should list all the content'},'Test Case');
	app2('a24','aaaa', null, 0,  function(a,ws,msg) {

	    if(ws)
		ws_cons[++l]=ws;//we are storing the web socket references in an array, will close these socket connections in after block
	    if(a==1) {
		done();
	    }
	    else {
		done(msg);
	    }
	})
    })

    it('Verify the status of already converted content after session disconnection/refresh, should list in content library.', function(done) {

	this.timeout(600000);
       log.info({"TC":'verify the status of already converted content after session disconnection/refresh, should list in content library'},'Test Case');
	app('a25','aaaa', 'test_refresh.pdf',  function(a,ws,msg) {

	    if(ws)
		var wss=ws;//we are storing the web socket references in an array, will close these socket connections in after block
	    if(a==1) {
		wss.close();
		app2('a25','aaaa', 'test_refresh.pdf', 1,  function(a,ws,msg) {

		    if(ws)
			ws_cons[++l]=ws;//we are storing the web socket references in an array, will close these socket connections in after block
		    if(a==1) {
			done();
		    }
		    else {
			done('After disconnection file is not listed in the content library');
		    }
		})

	    }
	    else {
		done(msg);
	    }
	})

    })

it('Verify user should able to upload duplicate filename with different extension', function(done) {

	this.timeout(600000);
       log.info({"TC":'Verify user should able to upload duplicate filename with different extension'},'Test Case');
	app('a26','aaaa', 'test.pdf',  function(a,ws,msg) {

	    if(ws)
		var wss=ws;//we are storing the web socket references in an array, will close these socket connections in after block
	    if(a==1) {
		wss.close();
		app('a26','aaaa', 'test.doc', function(a,ws,msg) {

		    if(ws)
			ws_cons[++l]=ws;//we are storing the web socket references in an array, will close these socket connections in after block
		    if(a==1) {
			done();
		    }
		    else {
			done('Following error occurs in this test case'+msg);
		    }
		})

	    }
	    else {
		done(msg);
	    }
	})

    })

    it('Verify content upload for a file, having 256 characters name', function(done) {

	this.timeout(300000);
	log.info({"TC":'Verify content upload for a file, having 256 characters name'},'Test Case');
	app('a27','aaaa', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopq.pdf', function(a,ws,msg) {

		if(ws)
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		if(a==1) {
			done();
		}
		else {
			done(msg);
		}
	})
    })  // end of it block

    it("Verify content upload for a file, where filename contains unicode characters like 'àĸĹǢőŒœŔƁƂ.pdf'", function(done) {

	this.timeout(300000);
	log.info({"TC":"Verify content upload for a file, where filename contains unicode characters like 'àĸĹǢőŒœŔƁƂ.pdf'"},'Test Case');
	app('a28','aaaa', 'àĸĹǢőŒœŔƁƂ.pdf', function(a,ws,msg) {

		if(ws)
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		if(a==1) {
			done();
		}
		else {
			done(msg);
		}
	})
    })  // end of it block





    afterEach(function(done) {     // close the web socket connections here after test suite

	this.timeout(60000);
	if(l==-1) {    // there is no web socket connection
	    done();
	}
	for(var i=0;i<=l;i++) {
	    try{
		ws_cons[i].close();
	    }
	    catch(e) {
		done('Exception occurs while closing web socket connection');
	    }
	    if(i==l) {
		l=-1;
		setTimeout(function(){ done();}, 3000);
	    }
	}
    })


})
