import './Header.scss'
import { gsapScrollTo } from '../utils/index'

function Header(props: { setActiveTab: (arg0: number) => void; activeTab: number; progress: number }) {

    function goTab(n:number){
        switch(n){
            case 0:
                gsapScrollTo({scrollTo:{ y:0, offsetY: -1} })
            break
            case 1:
                gsapScrollTo({scrollTo:{y:'#next', offsetY: -1}})
            break
        }
        props.setActiveTab(n)
    }

    function getProgress(isActive: boolean, progress: number): string {
        if(isActive){
            return progress*100 + '%'
        }
        return '0'
    }
    
    return (
        <div className='tabs'>
            <a className={'tab-item' + (props.activeTab === 0 ? ' active' : '')} onClick={() => goTab(0)}>
                INTRODUCTION
                <div className='tab-item-progress-bar'></div>
                <div className='tab-item-progress' style={{width: getProgress(props.activeTab === 0, props.progress)}}></div>
            </a>
            <a className={'tab-item' + (props.activeTab === 1 ? ' active' : '')} onClick={() => goTab(1)}>
                THE TECHNOLOGY
                <div className='tab-item-progress-bar'></div>
                <div className='tab-item-progress' style={{width: getProgress(props.activeTab === 1, props.progress)}}></div>
            </a>
        </div>
    )
}





export default Header
