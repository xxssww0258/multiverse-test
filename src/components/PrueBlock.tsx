import gsap from 'gsap'
import { useLayoutEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsapScrollTo } from '../utils';
function PrueBlock(props: { setActiveTab: (arg0: number) => void; }) {

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                id: "next",
                markers: false,
                trigger: '#next',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate() {
                    props.setActiveTab(1)
                },
                onLeaveBack() {
                    gsapScrollTo({ scrollTo: {y:0, offsetY: -1} })
                },
            })
        })
        return () => ctx.revert()
    }, [])

    return (
        <div id='next' style={{ background: 'skyblue' }}>
            {new Array(100).fill(0).map((_, i) => <p key={i}>{i}</p>)}
        </div>
    )
}


export default PrueBlock
