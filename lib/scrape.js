/*

**** Thanks To Dika Ardnt ****

*/


const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

function convertAngka(number) {
    const data = String(number).split('').reverse()
    let combine = ''
    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 3 == 0 && i != data.length - 1) {
            data[i] = `.${data[i]}`
        }
    }
    combine = `${data.reverse().join('')}`
    return combine
}

function isUrl(Link) {
	return Link.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}


const randomarray = async (array) => {
	return array[Math.floor(Math.random() * array.length)]
}


function hentaivid() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/'+page)
        .then((data) => {
            const $ = cheerio.load(data.data)
            const hasil = []
            $('#primary > div > div > ul > li > article').each(function (a, b) {
                hasil.push({
                    title: $(b).find('header > h2').text(),
                    link: $(b).find('header > h2 > a').attr('href'),
                    category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                    share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                    views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                    type: $(b).find('source').attr('type') || 'image/jpeg',
                    video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                    video_2: $(b).find('video > a').attr('href') || ''
                })
            })
            const random = hasil[Math.floor(Math.random() * hasil.length)]
            resolve({
                status: data.status,
                creator: 'Adalah..',
                hasil: random
            })
        })
    })
}


function pornvid()  {
    return new Promise((resolve, reject) => {
        axios.get('https://tikporntok.com/?random=1')
        .then((res) => {
            const $ = cheerio.load(res.data)
            const hasil = {}
            hasil.title = $('article > h1').text()
            hasil.source = $('article > div.video-wrapper.vxplayer').attr('data-post') || 'Web Not Response'
            hasil.thumb = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-poster') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png'
            hasil.desc = $('article > div.intro').text()
            hasil.upload = $('article > div.single-pre-meta.ws.clearfix > time').text()
            hasil.like = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(1) > span').text()
            hasil.dislike = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(2) > span').text()
            hasil.favorite = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(3) > span').text()
            hasil.views = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(4) > span').text()
            hasil.tags = $('article > div.post-tags').text()
            hasil.video = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('src') || $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-src') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png'
            resolve({ status: res.status, creator: 'Adalah..', hasil: hasil })
        })
    })
}

function tiktokDownloader (url) {
	return new Promise (async (resolve, reject) => {
		try {
			let RegToktok = isUrl(url)
			if (!RegToktok) return reject(new Error(String('Url Invalid')))
			const data = await axios({
				url: RegToktok[0],
				method: "GET",
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
					'cookie': 'sid_tt=7d0d1755f690ada52a059001b9ca695f; uid_tt=33a936b6d8d4619b5067b86be38461fb382e886d26f4edf6337ef6c70d7dc8cc; ttwid=1%7Cfpftinh7CEhYgKNa0Zi6Tg8okKrRQQej6DsUM8Bym-M%7C1638207165%7C9fde9d241c5e073dfd7fa32ade771c41113cda06e446de6ae15dbf66e7660997; tt_csrf_token=3UThbDQF_CxT9L0umbDIdUp-'
				}
			})
			const getNowm = await axios.request({
				url: "https://ttdownloader.com/",
				method: "GET",
				headers: {
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
				}
			})
			const c = cheerio.load(getNowm.data)
			const token = c("#token").attr('value')
			if (!token) return
			const format = {
				url: RegToktok[0],
				format: "",
				token
			}
			const post = await axios({
				url: "https://ttdownloader.com/req/",
				method: "POST",
				headers: {
					"accept": "*/*",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": getNowm.headers["set-cookie"][0]
				},
				data: new URLSearchParams(Object.entries(format))
			})
			const ch = cheerio.load(post.data)
			const FormatPost = {
				nowm: ch("#results-list > div:nth-child(2)").find("div.download > a").attr('href'),
				wm: ch("#results-list > div:nth-child(3)").find("div.download > a").attr('href'),
				audio: ch("#results-list > div:nth-child(4)").find("div.download > a").attr("href")
			}
			const $ = cheerio.load(data.data)
			const res = $('body').find('#__NEXT_DATA__').get()[0].children[0]
			const result = JSON.parse(res.data).props.pageProps.itemInfo.itemStruct
			const Format = {
				id: result.id,
				desk: result.desc,
				tanggal_buat: new Date(Number(result.createTime) * 1000).toLocaleString("id", {
					year: "numeric",
					month: "short",
					weekday: 'short',
					hour: 'numeric',
					minute: 'numeric',
					day: "numeric"
				}),
				durasi: result.video.duration + " Detik",
				resolusi: result.video.ratio,
				url_with_watermark: result.video.downloadAddr,
				thumbnail: result.video.cover,
				format: result.video.format,
				username: result.author.uniqueId,
				nickname: result.author.nickname,
				foto_profil: result.author. avatarLarger,
				verify: result.author.verified,
				music: {
					...result.music
				},
				statistic: {
					...result.stats
				},
				video_private: result.privateItem,
				duetEnabled: result.duetEnabled,
				stitchEnabled: result. stitchEnabled,
				...FormatPost
			}
			return resolve(Format)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

function instaDownloader (url) {
	return new Promise (async (resolve, reject) => {
		const RegPost = /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/p\/([-_0-9A-Za-z]{5,18})/gi.exec(url)
		const RegReels = /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/reel\/([-_0-9A-Za-z]{5,18})/gi.exec(url)
		const RegIgTv = /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/tv\/([-_0-9A-Za-z]{5,18})/gi.exec(url)
		const RegIgUs = /(?:http(?:s|):\/\/|)(?:www\.|)instagram.com\/([-_0-9A-Za-z]{5,18})/gi.exec(url)
		try {
			if (RegIgUs) {
                let BaseUrlReel = "https://www.instagram.com/"
				const data = await axios({
					url: BaseUrlReel + RegIgUs[1] + "/?__a=1",
					method: "GET",
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
						'cookie': 'crsftoken=nm20rJm2jFpkXUquLKw0c4qwdEArdPhg; ds_user_id=37572608640; ig_did=54AA06C9-3A86-4F53-A7F6-C9127DC153AC; ig_nrcb=1; mid=YU0dFwALAAHPggeAvlvEiV8DP9zM; sessionid=37572608640%3AdLIYIrAwso2GpN%3A8;'
					}
				})
                const Format = {
					link: data.data.graphql.user.profile_pic_url_hd,
                    caption: {
                        full_name: data.data.graphql.user.full_name,
                        user_name: data.data.graphql.user.username,
                        user_id: data.data.graphql.user.id,
                        followers: convertAngka(Number(data.data.graphql.user.edge_follow.count)),
                        following: convertAngka(Number(data.data.graphql.user.edge_followed_by.count)),
                        bussines: data.data.graphql.user.is_business_account,
                        profesional: data.data.graphql.user.is_professional_account,
                        verified: data.data.graphql.user.is_verified,
                        private: data.data.graphql.user.is_private,
                        biography: data.data.graphql.user.biography,
                        bio_url: data.data.graphql.user.external_url,
                        profile_ed: data.data.graphql.user.profile_pic_url,
                        profile_hd: data.data.graphql.user.profile_pic_url_hd
                    }
                }
                return resolve(Format)
            } else if (RegPost) {
				let BaseUrlPost = `https://www.instagram.com/p/`
				const data = await axios({
					url: BaseUrlPost + RegPost[1] + "/?__a=1",
					method: "GET",
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
						'cookie': 'crsftoken=nm20rJm2jFpkXUquLKw0c4qwdEArdPhg; ds_user_id=37572608640; ig_did=54AA06C9-3A86-4F53-A7F6-C9127DC153AC; ig_nrcb=1; mid=YU0dFwALAAHPggeAvlvEiV8DP9zM; sessionid=37572608640%3AdLIYIrAwso2GpN%3A8;'
					}
				})
				const getData = []
				for (let result of data.data.graphql.shortcode_media.display_resources) {
					getData.push({ url: result.src })
				}
				const format = {
					link: data.data.graphql.shortcode_media.video_url || getData[0].url,
                    link_two: getData[1].url || '',
                    link_three: getData[2].url || '',
					caption: {
                        username: data.data.graphql.shortcode_media.owner.username,
                        total_like: convertAngka(Number(data.data.graphql.shortcode_media.edge_media_preview_like.count)),
                        total_comment: convertAngka(Number(data.data.graphql.shortcode_media.edge_media_preview_comment.count)),
                        desc: data.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text,
                        link_array: getData
                    }
				}
				return resolve(format)
			} else if (RegReels) {
				let BaseUrlReel = "https://www.instagram.com/reel/"
				const data = await axios({
					url: BaseUrlReel + RegReels[1] + "/?__a=1",
					method: "GET",
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
						'cookie': 'crsftoken=nm20rJm2jFpkXUquLKw0c4qwdEArdPhg; ds_user_id=37572608640; ig_did=54AA06C9-3A86-4F53-A7F6-C9127DC153AC; ig_nrcb=1; mid=YU0dFwALAAHPggeAvlvEiV8DP9zM; sessionid=37572608640%3AdLIYIrAwso2GpN%3A8;'
					}
				})
				const Format = {
					link: data.data.graphql.shortcode_media.video_url,
                    caption: {
                        username: data.data.graphql.shortcode_media.owner.username,
                        thumbnail: data.data.graphql.shortcode_media.thumbnail_src,
					    total_views: convertAngka(Number(data.data.graphql.shortcode_media.video_view_count)),
					    total_plays: convertAngka(Number(data.data.graphql.shortcode_media.video_play_count)),
					    total_comment: convertAngka(Number(data.data.graphql.shortcode_media.edge_media_preview_comment.count)),
                        like: convertAngka(Number(data.data.graphql.shortcode_media.edge_media_preview_like.count)),
					    durasi: data.data.graphql. shortcode_media.video_duration
                    }
				}
				return resolve(Format)
			} else if (RegIgTv) {
				let BaseUrlIgtv = "https://www.instagram.com/tv/"
				const data = await axios({
					url: BaseUrlIgtv + RegIgTv[1] + "/?__a=1",
					method: "GET",
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
						'cookie': 'crsftoken=nm20rJm2jFpkXUquLKw0c4qwdEArdPhg; ds_user_id=37572608640; ig_did=54AA06C9-3A86-4F53-A7F6-C9127DC153AC; ig_nrcb=1; mid=YU0dFwALAAHPggeAvlvEiV8DP9zM; sessionid=37572608640%3AdLIYIrAwso2GpN%3A8;'
					}
				})
				const Format = {
					link: data.data.graphql.shortcode_media.video_url,
                    caption: {
                        title: data.data.graphql.shortcode_media.title,
                        username:  data.data.graphql.shortcode_media.owner.username,
					    thumbnail: data.data.graphql.shortcode_media.thumbnail_src,
					    total_comment: convertAngka(Number(data.data.graphql.shortcode_media.edge_media_preview_comment.count)),
					    total_view: convertAngka(Number(data.data.graphql.shortcode_media.video_view_count)),
					    total_play: convertAngka(Number(data.data.graphql.shortcode_media.video_play_count))
                    }
				}
				return resolve(Format)
            } else {
				return reject(new Error(String("Url Invalid")))
			}
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

function facebookDownloader(link) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://aiovideodl.ml/',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        }).then((src) => {
            let a = cheerio.load(src.data)
            let token = a('#token').attr('value')
            axios({
                url: 'https://aiovideodl.ml/wp-json/aio-dl/video-data/',
                method: 'POST',
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"   
                },
                data: new URLSearchParams(Object.entries({ 'url': link, 'token': token }))
            }).then(({ data }) => {
                resolve(data)
            })
        })
    })
}

function zippyDownloader(urls) {
    return new Promise((resolve, reject) => {
        axios.get(urls).then(({ data }) => {
            const $ = cheerio.load(data)
            const li = $.html()
            const po = $('#dlbutton').next().html()
            const le = po.split(';')[0]
            const lo = le.split("document.getElementById('dlbutton').href =")[1]
            const result = `${urls.split('/v')[0]}${eval(lo)}`
            const ho = $('#lrbox').text().replace(/\n/g, '')
			const ext = ho.split('Name:')[1].split('Size:')[0].split('.')[1]
            const hasil = {
                title: ho.split('Name:')[1].split('Size:')[0].trim(),
				extension: ext,
                filesize: ho.split('Size:')[1].split('Uploaded:')[0].trim(),
                upload: ho.split('Uploaded:')[1].split('          ')[0].trim(),
                link: result
            }
            resolve(hasil)
        })
    })
}

function mediafireDownloader(url) {
    return new Promise(async (resolve, reject) => {
        axios.get(url).then(({ data }) => {
            const $ = cheerio.load(data)
            link = $('a#downloadButton').attr('href')
            filesize = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
            seplit = link.split('/')
            title = seplit[5]
            mime = title.split('.')[1]
            resolve({ title, filesize, mime, link })
        })
    })
}

function xnxxsearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xnxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let results = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				results.push({
					title: title[i],
					info: desc[i],
					link: url[i]
				})
			}
			resolve({
				code: 200,
				status: true,
				result: results
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function xnxxdl(URL) {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			const duration = $('meta[property="og:duration"]').attr('content');
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
				result: {
					title,
					URL,
					duration,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}


module.exports = { xnxxdl, xnxxsearch, tiktokDownloader, instaDownloader, facebookDownloader, zippyDownloader, mediafireDownloader,pornvid ,hentaivid }
