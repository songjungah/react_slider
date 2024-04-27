import { useEffect, useState } from 'react'
import './slider.css'
// 리액트 아이콘(icon) > npm install react-icons
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

// 슬라이더 컴포넌트를 function 으로 만든다
// 컴포넌트는 첫글자 대문자!
// 다른 곳에서 사용하기 위해서 export default

export default function ImageSlider(props){
    // state 를 2개를 만든다 (이미지들, 현재 슬라이드 번호)
    let [images, setImages] = useState([]);
    let [curSlide, setCurSlide]= useState(0);
    let [loading, setLoadign] = useState(false);
    let [errMsg, setErrNsg] = useState(null);

    // picsum 서버에서 get 요청을 통해 이미지를 받아오자
    useEffect(()=>{
        // mount 생성시, update 갱신시, unmount 제거시
        // 3개의 이벤트에 대해서 실행할 코드를 넣는 공간
        // 평소에는 mount와 update는 같이 동작
        // unmoun는 return() 에서 동작
        // update 의 동작을 특정 대상에 대해서만 실행하려면
        // 두번째 인자에 []로 넣어줌
        if(props.url !== ''){
            // fetch 를 통해서 이미지를 get 요청하자
            fetchImages(props.url)

            console.log(images);
        }
        
        return(()=>{
            // unmount 공간
        })
    
    }, [props.url])      // []에 state 를 넣으면, update 가 해당 state 갱신시에만 발동하게 변경

    async function fetchImages(getUrl){
        setLoadign(true);
        // get 요청으로 이미지 경로를 받아온다 (async 비동기 : 동작에 영향을 미치치 않기위해)
        // await 은 이거 완료될때까지 기다리라는 의미
        let response = await fetch(`${getUrl}?page=${props.page}&limit=${props.limit}`)
        const data = await response.json();     // 받아온 문자열을 json 형태로 인식

        if(data){
            setImages(data);
            setLoadign(false);
        }
    }

    console.log(images);

    function goPrev(){
        if(curSlide ===0){
            setCurSlide(images.length -1);
        }else{
            //이전 슬라이드 번호로
            setCurSlide(curSlide -1);
        }
    }

    function goNext(){
        // 마지막 위치면 첫번째 슬라이드로 이동
        if(curSlide === images.length -1){
            setCurSlide(0)  // 첫번째 슬라이드 번호
        }else{
            setCurSlide(curSlide +1);
        }
    }

    return(
        <>
            <div className="slider-container">
                <BsArrowLeftCircleFill className='arrow arrow-left' onClick={goPrev}/>
                {
                    images && images.length ? (
                        images.map((image, idx)=>{
                            return(
                            <img key={image} src={image.download_url}
                            className={curSlide === idx ? "current-image" : "currnet-image hide-current-image"}/>)
                        })
                    ) : <div>이미지 로딩 중...</div>
                }
                <BsArrowRightCircleFill className='arrow arrow-right' onClick={goNext}/>
            </div>
        </>
    )
}


// export default : 파일의 대표
// export : 추가로 내보낼 변수 또는 함수
// reactjs : 클라이언트 렌더링 (사용자 PC에 의존)
// nextjs : 서버사이드 렌더링 (서버PC 성능에