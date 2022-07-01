/**
 * Sample JavaScript code for analytics.data.realtime.get
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

function authenticate() {
    return gapi.auth2
        .getAuthInstance()
        .signIn({
            scope: 'https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly',
        })
        .then(
            function () {
                console.log('Sign-in successful')
            },
            function (err) {
                console.error('Error signing in', err)
            }
        )
}
function loadClient() {
    //apiKEY apiKEY apiKEY
    gapi.client.setApiKey('AIzaSyBUk76vBclJz51-_i6X9q0IbuG2L9QZyXs')
    return gapi.client.load('https://content.googleapis.com/discovery/v1/apis/analytics/v3/rest').then(
        function () {
            console.log('GAPI client loaded for API')
        },
        function (err) {
            console.error('Error loading GAPI client for API', err)
        }
    )
}

// Make sure the client is loaded and sign -in is complete before calling this method.

// 頁面活躍度
var obj1 = {
    ids: 'ga:153085827',
    metrics: 'rt:activeUsers',
    dimensions: 'rt:pageTitle,rt:medium,rt:deviceCategory',
    'max-results': 50,
    sort: '-rt:activeUsers',
}
// 裝置分類
var obj2 = {
    ids: 'ga:153085827',
    metrics: 'rt:activeUsers',
    dimensions: 'rt:deviceCategory',
    sort: '-rt:activeUsers',
}
function execute() {
    // 10分鐘自動重整
    setInterval(function execute() {
        return gapi.client.analytics.data.realtime.get(obj1).then(
            function (obj1) {
                // Handle the results here (obj1.result has the parsed body).

                ;(function () {
                    return gapi.client.analytics.data.realtime.get(obj2).then(
                        function (obj2) {
                            let pt1 = parseInt(
                                (obj2.result.rows[0][1] / obj1.result.totalsForAllResults['rt:activeUsers']) * 100
                            )
                            let pt2 = parseInt(
                                (obj2.result.rows[1][1] / obj1.result.totalsForAllResults['rt:activeUsers']) * 100
                            )
                            let pt3 = parseInt(
                                (obj2.result.rows[2][1] / obj1.result.totalsForAllResults['rt:activeUsers']) * 100
                            )
                            $('.device-users ul #d1').html(pt1 + ' ％')
                            $('.device-users ul #d2').html(pt2 + ' ％')
                            $('.device-users ul #d3').html(pt3 + ' ％')
                            $('#d1').css('width', pt1 + '%')
                            $('#d2').css('width', pt2 + '%')
                            $('#d3').css('width', pt3 + '%')
                            console.log(pt1, pt2, pt3)
                        },
                        function (err) {
                            console.error('Execute error', err)
                        }
                    )
                })()

                $('.act-users').html(obj1.result.totalsForAllResults['rt:activeUsers'])
                $('.page-title #page_content').html('')
                var realtime_template = `
    <div class="col-10 c1">{{title}}</div>
    <div class="col-1 c2">{{medium}}</div>
    <div class="col-1 c3">{{device}}</div>
    `

                for (var i = 0; i < 20; i++) {
                    var realtime_html = realtime_template
                        .replace('{{title}}', obj1.result.rows[i][0])
                        .replace('{{medium}}', obj1.result.rows[i][1])
                        .replace('{{device}}', obj1.result.rows[i][3])
                    $('.page-title #page_content').append(realtime_html)
                }
            },
            function (err) {
                console.error('Execute error', err)
            }
        )
    }, 600000)

    return gapi.client.analytics.data.realtime.get(obj1).then(
        function (obj1) {
            // Handle the results here (obj1.result has the parsed body).

            ;(function () {
                return gapi.client.analytics.data.realtime.get(obj2).then(
                    function (obj2) {
                        let pt1 = parseInt(
                            (obj2.result.rows[0][1] / obj1.result.totalsForAllResults['rt:activeUsers']) * 100
                        )
                        let pt2 = parseInt(
                            (obj2.result.rows[1][1] / obj1.result.totalsForAllResults['rt:activeUsers']) * 100
                        )
                        let pt3 = parseInt(
                            (obj2.result.rows[2][1] / obj1.result.totalsForAllResults['rt:activeUsers']) * 100
                        )
                        $('.device-users ul #d1').html(pt1 + ' ％')
                        $('.device-users ul #d2').html(pt2 + ' ％')
                        // $('.device-users ul #d3').html(pt3 + ' ％');
                        $('#d1').css('width', pt1 + '%')
                        $('#d2').css('width', pt2 + '%')
                        $('#d3').css('width', pt3 + '%')
                    },
                    function (err) {
                        console.error('Execute error', err)
                    }
                )
            })()

            $('.act-users').html(obj1.result.totalsForAllResults['rt:activeUsers'])
            $('.page-title #page_content').html('')
            var realtime_template = `
          <div class="col-10 c1">{{title}}</div>
          <div class="col-1 c2">{{medium}}</div>
          <div class="col-1 c3">{{device}}</div>
          `

            for (var i = 0; i < 20; i++) {
                var realtime_html = realtime_template
                    .replace('{{title}}', obj1.result.rows[i][0])
                    .replace('{{medium}}', obj1.result.rows[i][1])
                    .replace('{{device}}', obj1.result.rows[i][3])
                $('.page-title #page_content').append(realtime_html)
            }
        },
        function (err) {
            console.error('Execute error', err)
        }
    )
}

gapi.load('client:auth2', function () {
    gapi.auth2.init({
        client_id: '234178802402-68tqnaf50p81pu0rfrt9ecoict6ama2r.apps.googleusercontent.com',
    })
})

///
///
///
// CrowdTangle
const news_tw = {
    url: 'https://api.crowdtangle.com/posts?token=murbXpQr49s3p8rDbXXF77tNocUIdLn9KagvmGoO&listIds=417347&sortBy=overperforming&count=10',
    method: 'GET',
    timeout: 0,
}

const news_global = {
    url: 'https://api.crowdtangle.com/posts?token=murbXpQr49s3p8rDbXXF77tNocUIdLn9KagvmGoO&listIds=417347&sortBy=total_interactions&count=10&types=live_video',
    method: 'GET',
    timeout: 0,
}
// https://api.crowdtangle.com/posts?token=murbXpQr49s3p8rDbXXF77tNocUIdLn9KagvmGoO&sortBy=total_interactions

function loadDataHandler() {
    setInterval(function loadDataHandler() {
        // 呼叫api:Taiwan News Competitors
        $.ajax(news_tw).done((response) => {
            let res = response.result.posts
            document.querySelector('#twNews').innerHTML = ''

            for (let i = 0; i < res.length; i++) {
                var newsImg = res[i].account.profileImage
                var newsMsg = limitMsg(res[i].message || '')
                var newsTime = res[i].updated
                var newsPhoto = res[i].media[0].url || ''
                var newsTitle = limitTitle(res[i].title || '')
                var newsName = res[i].account.name

                function limitTitle(ellTitle) {
                    let newsTitle = ellTitle
                    let lenTitle = newsTitle.length
                    let strTitle = ''

                    if (lenTitle > 30) {
                        strTitle = newsTitle.substring(0, 30) + '...'
                    } else {
                        return newsTitle
                    }
                    return strTitle
                }
                function limitMsg(ellMsg) {
                    let newsTitle = ellMsg

                    let lenTitle = newsTitle.length
                    let strTitle = ''

                    if (lenTitle > 60) {
                        strTitle = newsTitle.substring(0, 60) + '...'
                    } else {
                        return newsTitle
                    }
                    return strTitle
                }

                template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName)
            }

            function template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName) {
                let twNews_layout = `
    <main>
    <section>
      <div>
        <img class="cover" src="${newsImg}">
      </div>
      <div>
        <h3>${newsName}</h3>
      </div>
    </section>
    <section>
      <p>${newsMsg}</p>
      <div class="row post">
        <img class="col-12" src="${newsPhoto}" >
        <h2 class="col-12">${newsTitle}</h2>
      </div>
      <p>更新：${newsTime}</p>
    </section>
    </main>
    <footer></footer>

    `
                document.querySelector('#twNews').innerHTML += twNews_layout
            }
        })

        // 呼叫api:All Taiwan Pages
        $.ajax(news_global).done((response) => {
            let res = response.result.posts
            document.querySelector('#globalNews').innerHTML = ''

            for (let i = 0; i < res.length; i++) {
                var newsImg = res[i].account.profileImage
                var newsMsg = limitMsg(res[i].message || '')
                var newsTime = res[i].updated
                var newsPhoto = res[i].media[1].url || ''
                var newsTitle = limitTitle(res[i].title || '')
                var newsName = res[i].account.name

                function limitTitle(ellTitle) {
                    let newsTitle = ellTitle
                    let lenTitle = newsTitle.length
                    let strTitle = ''

                    if (lenTitle > 30) {
                        strTitle = newsTitle.substring(0, 30) + '...'
                    } else {
                        return newsTitle
                    }
                    return strTitle
                }

                function limitMsg(ellMsg) {
                    let newsTitle = ellMsg

                    let lenTitle = newsTitle.length
                    let strTitle = ''

                    if (lenTitle > 60) {
                        strTitle = newsTitle.substring(0, 60) + '...'
                    } else {
                        return newsTitle
                    }
                    return strTitle
                }

                template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName)
            }

            function template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName) {
                let globalNews_layout = `
    <main>
    <section>
      <div>
        <img class="cover" src="${newsImg}">
      </div>
      <div>
        <h3>${newsName}</h3>
      </div>
    </section>
    <section>
      <p>${newsMsg}</p>
      <div class="row post">
        <img class="col-12" src="${newsPhoto}" >
        <h2 class="col-12">${newsTitle}</h2>
      </div>
      <p>更新：${newsTime}</p>
    </section>
  </main>
  <footer></footer>

  `
                document.querySelector('#globalNews').innerHTML += globalNews_layout
            }
        })

        // 每十分鐘更新一次
    }, 600000)

    // Taiwan News Competitors
    $.ajax(news_tw).done((response) => {
        let res = response.result.posts
        // console.log(res)

        document.querySelector('#twNews').innerHTML = ''

        for (let i = 0; i < res.length; i++) {
            var newsImg = res[i].account.profileImage
            var newsMsg = limitMsg(res[i].message || '')
            var newsTime = res[i].updated
            let newsPhoto = res[i].media[0].url || ''
            var newsTitle = limitTitle(res[i].title || '')
            var newsName = res[i].account.name

            function limitTitle(ellTitle) {
                let newsTitle = ellTitle
                let lenTitle = newsTitle.length
                let strTitle = ''

                if (lenTitle > 30) {
                    strTitle = newsTitle.substring(0, 30) + '...'
                } else {
                    return newsTitle
                }
                return strTitle
            }

            function limitMsg(ellMsg) {
                let newsTitle = ellMsg

                let lenTitle = newsTitle.length
                let strTitle = ''

                if (lenTitle > 60) {
                    strTitle = newsTitle.substring(0, 60) + '...'
                } else {
                    return newsTitle
                }
                return strTitle
            }

            template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName)
        }

        function template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName) {
            let twNews_layout = `
  <main>
    <section>
      <div>
        <img class="cover" src="${newsImg}">
      </div>
      <div>
        <h3>${newsName}</h3>
      </div>
    </section>
    <section>
      <p>${newsMsg}</p>
      <div class="row post">
        <img class="col-12" src="${newsPhoto}" >
        <h2 class="col-12">${newsTitle}</h2>
      </div>
      <p>更新：${newsTime}</p>
    </section>
  </main>
  <footer></footer>

`
            document.querySelector('#twNews').innerHTML += twNews_layout
        }
    })

    // All Taiwan Pages
    $.ajax(news_global).done((response) => {
        let res = response.result.posts
        // console.log(res)

        document.querySelector('#globalNews').innerHTML = ''

        for (let i = 0; i < res.length; i++) {
            var newsImg = res[i].account.profileImage
            var newsMsg = limitMsg(res[i].message || '')
            var newsTime = res[i].updated
            var newsPhoto = res[i].media[1].url || ''
            var newsTitle = limitTitle(res[i].title || '')
            var newsName = res[i].account.name

            function limitTitle(ellTitle) {
                let newsTitle = ellTitle

                let lenTitle = newsTitle.length
                let strTitle = ''

                if (lenTitle > 30) {
                    strTitle = newsTitle.substring(0, 30) + '...'
                } else {
                    return newsTitle
                }
                return strTitle
            }

            function limitMsg(ellMsg) {
                let newsTitle = ellMsg

                let lenTitle = newsTitle.length
                let strTitle = ''

                if (lenTitle > 60) {
                    strTitle = newsTitle.substring(0, 60) + '...'
                } else {
                    return newsTitle
                }
                return strTitle
            }

            template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName)
        }

        function template(newsImg, newsMsg, newsPhoto, newsTitle, newsTime, newsName) {
            let globalNews_layout = `
  <main>
    <section>
      <div>
        <img class="cover" src="${newsImg}">
      </div>
      <div>
        <h3>${newsName}</h3>
      </div>
    </section>
    <section>
      <p>${newsMsg}</p>
      <div class="row post">
        <img class="col-12" src="${newsPhoto}" >
        <h2 class="col-12">${newsTitle}</h2>
      </div>
      <p>更新：${newsTime}</p>
    </section>
  </main>
  <footer></footer>
`
            document.querySelector('#globalNews').innerHTML += globalNews_layout
        }
    })
}

let btnLoad = document.querySelector('#load')
btnLoad.addEventListener('click', loadDataHandler)

///
///
///
// Google trends
function getKeyWord() {
    $('#rowGoogleTrends div').text('')
    $(function ($) {
        $('#rowGoogleTrends div').rss('https://trends.google.com.tw/trends/trendingsearches/daily/rss?geo=TW', {
            limit: 20,
            entryTemplate: '<li>{title}</li>',
        })
    })
    setInterval(function getKeyWord() {
        $('#rowGoogleTrends div').text('')
        $(function ($) {
            $('#rowGoogleTrends div').rss('https://trends.google.com.tw/trends/trendingsearches/daily/rss?geo=TW', {
                limit: 20,
                entryTemplate: '<li>{title}</li>',
            })
        })
    }, 1800000)
}
