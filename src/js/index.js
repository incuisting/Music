import 'normalize.css'
import '../css/reset.css'
import '../css/index.scss';

import $ from 'jquery';

$(function() {
            $.get('./server/lastsetMusic.json').then(function(response) {
                let items = response
                items.forEach(i => {
                    let $li = $(
                        `
            <li>
            <a href="./songs.html?id=${i.id}">
            <h3>${i.name}</h3>
            <p>${i.singer}-${i.album}</p>
            <svg class="play">
            <use xlink:href="#icon-play"></use>
            </svg>
            </a>
            </li>
            `
                    )
                    $('#lastsetMusic').append($li)
                })
                $('#lastestMusicLoading').remove()
            })

            $('.siteNav').on('click', 'ol.tabItems>li', function(e) {
                let $li = $(e.currentTarget).addClass('active')
                $li.siblings().removeClass('active')
                let index = $li.index()
                $li.trigger('tabChange', index)
                $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
            })

            $('.siteNav').on('tabChange', function(e, index) {
                        let $li = $('.tabContent > li').eq(index)
                        if ($li.attr('data-downloaded') === 'yes') {
                            return
                        }
                        if (index === 1) {
                            $.get('./server/hot-music.json').then((response) => {
                                        $li.attr('date-downloaded', 'yes')
                                        let items = response
                                        items.forEach(item => {
                                                    let $li = $(
                                                            `
                                <li>
                                <a href="./songs.html?id=${item.id}">
                                <h2 class="hot-num">${item.num}</h2>
                                <div class="item-body">
                                <h3>${item.name}</h3>
                                <div class="singer-album">${item.sq?`<svg class="sq"><use xlink:href="#icon-sq"></use></svg>`:''}
                                <p>
                                ${item.singer}-${item.album}
                                </p>
                                </div>
                                <svg class="play">
                                <use xlink:href="#icon-play"></use>
                                </svg>
                                </div>
                                </a>
                                </li>
                            `
                            )
                            $('#hotMusic').append($li)
                        })
                    $('#tab2Loading').remove()
                    $('.hot-music>.hot-top').addClass('active')
            })
        } else if (index === 2) {
            return
        }

    })
    // 搜素框点击后的界面切换
    $('.search-input>.close').on('click',function(){
        $('input#searchSong').val('')
        $('.search>.hot-search').removeClass('hidden')
        $('.search>.search-history').removeClass('hidden')
        $('.search-input>.close').css({"visibility":"hidden"})
        $('#output').removeClass('active')
    })

    // 移除历史搜索
    $('.search-history>ul').on('click','svg',function(e){
        let current = $(e.currentTarget)
        let currentClassName = current.attr('class')
        if(currentClassName === 'close1'){            
            current.parents('li')[0].remove()
        }
    })

    let timer = undefined
    $('input#searchSong').on('input', function(e) {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        $('.search>.hot-search').addClass('hidden')
        $('.search>.search-history').addClass('hidden')
        $('#output').addClass('active')
        $('#output>h3').addClass('active').text(`搜索"${value}"`)
        if (value === '') {
            $('.search-input>.close').css({"visibility":"hidden"})
            $('.search>.hot-search').removeClass('hidden')
            $('.search>.search-history').removeClass('hidden')
            $('#output').removeClass('active')        
            return
        }
        $('.search-input>.close').css({"visibility":"visible"})
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function() {
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    $('#output>ul').empty()
                    let $ul = $('<ul></ul>')
                    result.forEach((item) => {
                        let $li = $(
                            `
                            <li>
                            <a href="/songs.html?id=${item.id}">
                            <svg class="search">
                            <use xlink:href="#icon-search"></use>
                            </svg>
                            <p>
                            ${item.name}
                            </p>
                            </a>
                            </li>`)
                        $li.appendTo($ul)
                    })
                    $ul.appendTo($('#output'))
                } else {
                    $('#output>p').text('没有结果')
                }
            })
        }, 300)

    })

    function search(keyword) {
        console.log('搜索' + keyword)
        return new Promise((resolve, reject) => {
            var database = [
                {
                    "id": 1,
                    "name": "Look What You Made Me Do"
                },
                {
                    "id": 2,
                    "name": "远走高飞"
                },
                {
                    "id": 3,
                    "name": "追光者"
                },
                {
                    "id": 4,
                    "name": "What Lovers Do"
                },
                {
                    "id": 5,
                    "name": "非酋"
                },
                {
                    "id": 6,
                    "name": "再也没有"
                },
                {
                    "id": 7,
                    "name": "全部都是你"
                },
                {
                    "id": 8,
                    "name": "带你去旅行"
                },
                {
                    "id": 9,
                    "name": "童话镇"
                },
                {
                    "id": 10,
                    "name": "Despacito (Remix)"
                },
                {
                    "id": 11,
                    "name": "成都"
                },
                {
                    "id": 12,
                    "name": "老大"
                },
                {
                    "id": 13,
                    "name": "尽头"
                },
                {
                    "id": 14,
                    "name": "暧昧"
                },
                {
                    "id": 15,
                    "name": "九张机"
                },
                {
                    "id": 16,
                    "name": "在人间"
                },
                {
                    "id": 17,
                    "name": "Shape of You"
                },
                {
                    "id": 18,
                    "name": "告白气球"
                },
                {
                    "id": 19,
                    "name": "刚好遇见你"
                },
                {
                    "id": 20,
                    "name": "I Am You"
                }
            ]
            let result = database.filter(function(item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function() {
                console.log('搜到' + keyword + '的结果')
                resolve(result)
            }, (Math.random() * 200 + 1000))
        })
    }
})