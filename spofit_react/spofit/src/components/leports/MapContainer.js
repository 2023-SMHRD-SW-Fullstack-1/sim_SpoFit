import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import './Leports.css'

const { kakao } = window

const MapContainer = ({ searchPlace, aaa, setAaa, setPlace }) => {
  
  // 좌표 변경 코드
  const [ln, setLn] = useState(35.149896);
  const [lo, setLo] = useState(126.9197772);
  
  const [isActive, setIsActive] = useState(false);
  
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])

  useEffect(() => {
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = document.getElementById('myMap')// 지도를 표시할 div 
    const options = {
  
      center: new kakao.maps.LatLng(ln,lo),// 지도의 중심좌표
      level: 2,// 지도의 확대 레벨
    }

    // 지도를 생성
    const map = new kakao.maps.Map(container, options)
  
    // 장소 검색 객체를 생성  
    const ps = new kakao.maps.services.Places()
    // 장소검색 객체를 통해 키워드로 장소검색을 요청

    if(aaa){
      searchPlace.length >=1 && ps.keywordSearch(searchPlace, placesSearchCB)
      // marker2.setMap(null);
      setAaa(false);
    }else{
              // 마커가 표시될 위치입니다 
        if(ln!=35.149896){
        var markerPosition2  = new kakao.maps.LatLng(ln, lo); 

        // 마커를 생성합니다
        var marker2 = new kakao.maps.Marker({
            position: markerPosition2
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker2.setMap(map)
      }
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()
      
        //마커 표출 
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
        setIsActive(true)
       
      
     
      }else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i 

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i+' '
        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
        el.className = 'on'
      }
      paginationEl.appendChild(fragment)
    }

    //마커 ,마커 네임
    function displayMarker(place) {
      
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
    
  }, [searchPlace, ln])
  
  
  const findAddress = (e)=>{
  
      var geocoder = new kakao.maps.services.Geocoder();
  
      geocoder.addressSearch(e, function(result, status) {
  
        // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {  
            // 결과값으로 받은 위치로 중심 이동합니다
  
            setLo(result[0].x);
            setLn(result[0].y);
            setPlace('');
  
      }
      
  })

    
}

  return (
  

    <div className='map-list'>

      <div id='result-list' style={isActive? {display: 'block'} : {}}>
        {Places.map((item, i) => (
          <div key={i}>
            <br></br>
            <b>{i + 1}</b>
            <div>
              <h6><strong>{item.place_name}</strong></h6>
              {item.road_address_name ? (
                <div>
                  <Button onClick={()=>{findAddress(item.address_name)}}variant="primary">이동</Button> <br/>{" "}<span>{item.road_address_name}</span>
                  <br/>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
                )}
              <span>{item.phone}</span>
              <br/>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
        <br/>
        </div>
        
        <div
        id="myMap"
        style={{
          width: '90vh',
          height: '620px'          
        }}
      ></div>
      </div>
   
  )
}

export default MapContainer