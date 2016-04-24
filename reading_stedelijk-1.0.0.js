/*\
|*|	
|*|	Reading (Stedelijk.nl) 
|*| Copyright 2015 Benjamin Forster
|*|
|*|
|*|	This work is licensed under the Creative Commons 
|*|	Attribution-NonCommercial-ShareAlike 4.0 International License. 
|*|	To view a copy of this license, visit:
|*|	
|*|	http://creativecommons.org/licenses/by-nc-sa/4.0/.
|*|
|*|	Unless required by applicable law or agreed to in writing, software
|*|	distributed under the License is distributed on an "AS IS" BASIS,
|*|	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
|*|	See the License for the specific language governing permissions and
|*|	limitations under the License.
|*|
\*/

var source_text = "slow down; this work is; about reading; reading through; how text proliferates; multiplies; everything we understand; through an other; it is citation; it is a network; lines drawn through time; a non - linear history; this collective fiction; we write together; my dreams overflow; with intoxicating liquor; at odds with this; hyper functional mode; suspicious of; the simplicity;  a circle that encloses; this is fiction; this is fact; this is criticism; this is the artwork; it is about; it is it is; about - ness; explanations overflow; active verbs dominate; click click click; in the imperative; do do do; there is no rush; slow down; this text; it stands between us; a material; transmission; viscous virus; relaying pulses; i am here; amp up this broadcast; scream to the; meat of language; you are here; echoing out assertions; the signal lost to the noise; a diffuse haze; noise becomes the signal; between the words; written and set; point point point; a reading through; with meter; these words crack; dust accumulates; and blurs the surface; i feel unsure; this i that is; always made of many; a cluster of; i i i i i i i’s; we are defined; by our reading; thick letters to friends; mirroring this process;  this text reading a text; read through; each letter selects a word; the next in the series; that matches the letter; it expands; becoming a new sentence; as the original sentence; becomes a paragraph; of filtered economic sentences; cut and rearranged; the words already present; always already here; re - presented; the precision of words; carefully constructed; becomes - f r a c t u r e d; in this process; meaning is set free; from the economic; it reads as random; it is not; it is rather; a process of reading; as it always is; words in relation to words; bodies pressed together; sweat and bad breath; remember; the line between literature; and press release; this membrane; is porous; it’s not a hard line; we can punch through; history has no origin; in this sea of words; in and out of the ebb; through around the flow; cited - noted; pinned down surely; knowledge is constructed; little islands; nouns strung together; into archipelagos; merchant ships; waving the flags of; i i i i i; i want to swim; out until the shore; is no longer visible; tire and drown; in the unowned; useless words; the text you read is; derived from; the words on this page; using this text; one phrase at a time; to read through the website; a letter becomes a word; a word a sentence; a phrase into a paragraph; the source text is highlighted; it takes turns; first the derived paragraph; and then; the source phrase; first the fragments; and then their key; one phrase at a time; and repeat; this continues; reading and rereading anew;";

$(document).ready(function() {
	
	var site = 'stedelijk.nl';
	
	//set options for stedelijk
	var options = {
		site: site,
		fade_in_time : 1000,
		fade_out_time : 1000,
		off_time : 4000,
		on_time : 750, // per word
		cookie_life : 60*60*1, //three hours
		cookie_domain : '.'+site,
		exclude: [],
		stopable: true,
		time_constrained: true,
		click_tolerance: 10,
		dismiss_time: 30,// 30 minutes
		highlight_style: "color:grey",
		phrase_style: "font-family:\'UnionAUnderline\';color:grey",
		cover_style: "position:fixed; top:0; left:0; height:100%; width:100%; text-align:center;background-color:#FFF; z-index:9999; -webkit-transform-style:preserve-3d; -moz-transform-style:preserve-3d; transform-style:preserve-3d;",
		title_text: '<span style="font-family:\'UnionAUnderline\'">Benjamin Forster</span> Reading ('+site+') <span style="font-family:\'UnionAUnderline\'">2015</span><br><sub style="font-family:\'UnionA\';font-size:40%">an online performance from 8 - 10 pm tonight</sub>',
		escape_element: '<div style="position:absolute;top:10px;right:10px;width:20px;height:10px;margin:0"><a style="font-family:\'UnionA\', \'avantgarde\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;color:#000;text-decoration:none;font-size:20px;color:#000" href="javascript:">X</a></div>',
		credit_element: '<div style="position:absolute;bottom:10px;right:10px;left:10px;height:auto;padding:0;margin:0"><p style="font-family:\'Helvetica Neue\', Helvetica, Arial, sans-serif;color:#000;text-decoration:none;text-align:right; font-size:10px;color:grey;line-height:10px;padding:0;margin:0">Benjamin Forster, <span style="font-style: italic;">Reading (stedelijk.nl)</span>, online performance, website Stedelijk Museum Amsterdam, May 21 2015</p></div>',
		text_element: '<h2 class="h0" style="font-family:\'UnionA\', \'avantgarde\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; position:relative;top:50%;word-wrap:break-word;word-break:normal;"></h2>',
	};	
	
	var user_data = load_user();
	console.log(window.location.href);
	var url = window.location.href;
	//check whether to run or not;
	//has user canceled it or is domain excluded 	
	var skip = (user_data.d===1)? true : false;
	//is the time within the performance period? // only applicable to the stedelijk
	if(!skip && options.time_constrained) skip = within_date(0,16,18); // return false if 4 = thursday, 20 >= 8pm and 22 <= 10pm
	//is current page is url a base domain
	if(!skip && !is_base_url(url)) skip = true;
	// does this url match any of the excluded domains
	if(!skip) {
		for(var i =0; i<options.exclude.length ;i++) {
			if(url.indexOf(options.exclude[i])>=0) {
				skip = true;
				break;
			}
		}
	}
	
	if(!skip) run(user_data, options);
	
	// FUNCTION DEFINITIONS
	
	function load_user() {
	  	return { 
		  	i: _to_int(docCookies.getItem('bf_index')) % source_text.length,
		  	s: _to_int(docCookies.getItem('bf_state')),
		  	c: _to_int(docCookies.getItem('bf_clicks')),
		  	d: _to_int(docCookies.getItem('bf_dismiss')),
		  	t: _to_int(docCookies.getItem('bf_title'))
		};
  	}
  	
  	function _to_int(i) { return (i === null)? 0: parseInt(i); }
	
	function is_base_url(url) {
		var re = new RegExp('^http(?:s)?:\/\/(www\.)?'+options.site,'gi');
		return re.test(url);
	}
	
	function within_date(day,min,max) {
		var now = new Date();
		return !(now.getDay() === day && now.getHours() >= min && now.getHours() < max);
	}
	
});

//Function that can be called in a link to restart application
function clear_cookies() {
	docCookies.removeItem('bf_dismiss');
	docCookies.setItem('bf_clicks', 0, options.cookie_life,'/',options.cookie_domain);
	docCookies.setItem('bf_index', 0, options.cookie_life,'/',options.cookie_domain);
	docCookies.setItem('bf_state', 0, options.cookie_life,'/',options.cookie_domain);
	docCookies.setItem('bf_title', 0, options.cookie_life,'/',options.cookie_domain);
}

function run(user_data,options){
	
	// generate text content from the page
	var content_index = 0;
	var content = [];
	$('body').find(':not(script, nav *)')
		.contents()
		.filter(function() {
			return this.nodeType === 3; //Node.TEXT_NODE
  		})
  		.each(function(i, e) {
	  		var re = /[^#@\(\)\[\]\s\d]+/gi;
	  		var words = e.data.match(re);
	  		if(words!=null) {
		  		for (var i = 0 ; i < words.length; i++) {
			  		//add filter here to avoid words that are just punctuation
			  		content.push(words[i]);
		  		}
	  		}
  		});
  		
  	// construct cover
  	var cover = '<div style="'+options.cover_style+'">'	
  				+ options.credit_element
  				+ ((options.stopable) ? options.escape_element : '')
  				+ options.text_element
  				+'</div>';
  	var div = $(cover).appendTo('body');
  	div.toggle(); //hide immediately
  	  	
  	var text = div.find('h2'); //get element for text
  	var clickable = false;
  	var display_state = user_data.s;
  	var sentence = '';
  	var timer = null;
  	
	// load event handlers
	div.click(user_clicked);
	$(window).resize(text, set_text_display);
	
	//start  	
  	start();
  	
	// FUNCTION DEFINITIONS
  	
  	function start() {
		
		if(user_data.t === 0) {
			text.html(options.title_text);
			display_state = 1;
		} else if(display_state==0) {
		  	sentence = make_sentence();
		  	text.html(sentence.text);
	  	} else {
		  	text.html(get_last_phrase());
	  	}  	
	  	
		set_text_display();

		//start
	  	var timer = setTimeout(fade_in, 750);
  	}
  	
  	function fade_in() {
	  	clearInterval(timer);
	  	div.fadeIn(options.fade_in_time, fade_in_done);
	  	set_text_display();
  	}
  	
  	function fade_in_done() {
	  	clickable = true;
	  	if(display_state===0) process(true);
	  	else {
		  	docCookies.setItem('bf_state', 0, options.cookie_life,'/',options.cookie_domain);
		  	docCookies.setItem('bf_title', 1, options.cookie_life,'/',options.cookie_domain);
		  	user_data.t = 1;
		  	var c = (text.html().match(/ /g) || []).length +1;
		  	if(c>6) c =6;
		  	setTimeout(fade_out,options.on_time*c);
		}
  	}
  	
  	function process(first) {
	  	clearInterval(timer);
	  	var then = new Date();
	  	var length = sentence.length;
	  	var delimiter = sentence.delimiter;
	  	
	  	if(delimiter!==';') sentence = make_sentence();
	  	
	  	var delay = new Date() - then;
	  	//update cookie
	  	docCookies.setItem('bf_index', user_data.i, options.cookie_life,'/',options.cookie_domain);
  		if( delimiter === ';') {
	  		//set timer to the fade out and generate next sentece.
	  		var out_time = (options.on_time * length) - options.fade_out_time;
	  		if(out_time<500) out_time = 500;
	  		timer = setTimeout( fade_out ,out_time - delay);
	  		docCookies.setItem('bf_state', 1, options.cookie_life,'/',options.cookie_domain);
	  	} else { //phrase is not finished get next sentence
		  	//switch time is related to length of line.
		  	var switch_time = (options.on_time * length)
		  	if(first) {
			  	switch_time -= options.fade_in_time;
			  	if(switch_time<500) switch_time = 500;
			}
		  	timer = setTimeout( show_next_sentence ,switch_time - delay)
	  	}
  	}
  	
  	function show_next_sentence() {
	  	text.html(sentence.text);
	  	set_text_display()
	  	process();
  	}
  	
  	function fade_out() {
	  	clearInterval(timer);
	  	div.fadeOut( options.fade_out_time, fade_out_done);
  	}
  	
  	function fade_out_done() {
		  	//switch to new sentence
		  	if(display_state===0) {
			  	text.html(get_last_phrase());
			  	display_state = 1;
			} else {
				sentence = make_sentence();
				text.html(sentence.text);
				display_state = 0;
			}
		  	clickable = false;
		  	//display next phrase
		  	timer = setTimeout(fade_in, options.off_time);
	}
	
  	function set_text_display() {
	  	var width = $(window).width();
	  	var size = '3.1428em';
	  	var wordbreak = 'normal';
	  	if (width>=1024) {
		  	size = '6.1428em';
		} else if (width>=768) {
			size = '4.5em';
		} else {
			wordbreak = 'break-all';
		}
	  	text.css('font-size', size);
	  	text.css('line-height', 1.2);
	  	text.css('word-break', wordbreak);
	  	
	  	var y = ($(window).height() - text.outerHeight(true));
	  	if(y<0) {
		  	text.css('word-break', 'break-all');
		  	y = ($(window).height() - text.outerHeight(true));  	
		}
		text.css('top',(y/2.0));
  	}
  	
  	function make_sentence() { // returns sentence structure 
	  	var character;
	  	var sentence = '';
	  	var length = 0;
	  	var prevent_count = 10;
	  	while(length<=0 && prevent_count>=0) {	  	
		  	while((character = source_text.charAt(user_data.i)) !== ' ' && character != ';') {
				var word = find_word(character);
				if(sentence.length !== 0)	sentence+=' ';
				sentence += word;
				if(word!=='') length++;
				user_data.i += 1;
				if(user_data.i == source_text.length) {
					user_data.i = -1;
					character=';';
					break;
				}
		  	}
		  	user_data.i += 1;
		  	user_data.i %= source_text.length;
		  	prevent_count--;
	  	}
	  	return { text: sentence, delimiter:character, length: length };
  	}
  	
  	function get_last_phrase() {
		var last = user_data.i-1;
		if (last < 0) last = source_text.length-1;
		var first = source_text.lastIndexOf(';',last-1);
		if (first>0) first+=2;
		return '<span style="'+options.phrase_style+'">'+ source_text.substring(first, last)+'</span>';
  	}
  	
  	function find_word(c) {
	  	var start = content_index;
	  	var regex = new RegExp('('+c+')','i');
	  	var failed = false;
	  	var not = []
	  	while ( !regex.test(content[content_index])) {
		  	not.push(content[content_index]);
		  	content_index++;
			content_index %= content.length;
			if (start === content_index) {
				//no dice.
				failed = true;
				break;
			}
		}
		var word = (!failed) ? content[content_index] : c;
		content_index++;
		content_index %= content.length;
		word = word.replace(regex, function(c) { return "<span style='"+options.highlight_style+"'>"+c+"</span>"; })
		return word;
  	}
  	
  	function user_clicked() {
	  	if (clickable && options.stopable) {
		  	//do something when the user clicks
		  	clearInterval(timer);
		  	div.stop(true,false);
		  	user_data.c++;
		  	//store clicks in cookie.
		  	docCookies.setItem('bf_clicks', user_data.c, options.cookie_life,'/',options.cookie_domain);
		  	if (user_data.c >= options.click_tolerance) {
			  	//save dismissed state
			  	docCookies.setItem('bf_dismiss', 1, options.dismiss_time,'/',options.cookie_domain);
			  	//stop future runs.
			  	div.fadeOut(300);
		  	} else {
			  	div.fadeOut(300,fade_out_done);
		  	}
	  	}
  	}
  	
}

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
