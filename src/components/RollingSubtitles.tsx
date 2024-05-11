import {  useLayoutEffect, useState } from 'react'
import './RollingSubtitles.scss'
import gsap from 'gsap'
import {deepClone, gsapScrollTo} from '../utils/index'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

function RollingSubtitles(props: { setActiveTab: (arg0: number) => void; setProgress: (arg0: number) => void }) {
    const [translateY, setTranslateY] = useState(0)
    const [subtitles, setSubtitles] = useState([
        {
            text:'11111111111',
            opacity:0,
            translateY:0,
            scale: 1
        },
        {
            text:'222222222',
            opacity:0,
            translateY:0,
            scale: 1
        },
        {
            text:'33333333333',
            opacity:0,
            translateY:0,
            scale: 1,
        },
        {
            text:'444444444',
            opacity:0,
            translateY:0,
            scale: 1,
        },
        {
            text:'5555555555',
            opacity:0,
            translateY:0,
            scale: 1,
        },
        {
            text:'666666666666',
            opacity:0,
            translateY:0,
            scale: 1,
        },
        {
            text:'7777777777',
            opacity:0,
            translateY:0,
            scale: 1,
        },
        {
            text:'8888888888',
            opacity:0,
            translateY:0,
            scale: 1,
        },
        
    ])

    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
            ScrollTrigger.create({
                id: "RollingSubtitles",
                markers: true,
                trigger: '.RollingSubtitles',
                start: 'top top',
                end: 'bottom top',
                pin: true,
                scrub: true,
                onLeave(){
                    // 跳转到第二屏幕
                    gsapScrollTo({ scrollTo: {y:'#next', offsetY: -1} })
                },
                onUpdate(self){
                    if(self.progress < 1){
                        props.setActiveTab(0)
                    }
                    props.setProgress(self.progress)
                    // 字幕动画
                    const newSubtitles = deepClone(subtitles)
                    const length = newSubtitles.length
                    const mid = length * self.progress // 百分比乘以总长度 得到一个焦点值
                    const distance = 3 // 定义一个最远距离 超过这个距离 差距就是100%
                    newSubtitles.map((x: { opacity: number; scale: number },i: number)=>{
                        let LimitedDisparity = Math.abs(mid - i) / distance
                        LimitedDisparity = LimitedDisparity > 1 ? 1 : LimitedDisparity

                        x.opacity = 1 -  LimitedDisparity
                        x.scale = mid + 3 - i
                    })
                    setTranslateY(self.progress * -100)
                    setSubtitles(newSubtitles)
                },
            });
        })
        return ()=>ctx.revert()
    },[])

    return (
        
        <div className='RollingSubtitles'>
            <video width='100%' height='100%' className='video' src="http://www.feedmusic.com/videos/intro.mp4" autoPlay muted loop></video>
            <div style={{paddingTop: '40vh'}}>
                {/* 这层控制字幕滚动 */}
                <div className='subtitle-wrap' style={{transform: `translateY(${translateY}%)`}}>
                    {/* 这层控制字幕大小 和 显隐 */}
                    {subtitles.map(x=><div 
                        className='subtitle' 
                        style={{
                            opacity: x.opacity,
                            transform: `translateY(${x.translateY}%) scale(${x.scale})`,
                        }} 
                        key={x.text}
                        > {x.text} </div>)}
                </div>
            </div>
        </div>
    )
}

export default RollingSubtitles
