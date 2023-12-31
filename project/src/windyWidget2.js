// // Second widget from the windy.app site
// // The widget is based as a div using useRef()
//
// import React, {useEffect, useRef} from 'react';
//
// function WindyWidget() {
//     const divRef = useRef(); // the base of the div that we're making for the widget
//
//     useEffect(() => {
//         const script = document.createElement('script'); // adding script
//         script.src = "https://windy.app/widget3/windy_map_async.js"; // from windy.app site
//         script.async = true;
//         divRef.current.appendChild(script);
//
//         const div = document.createElement('div'); // creating and adding the div
//         div.setAttribute('data-windywidget', 'map');
//         div.setAttribute('data-spotid', '2651333');
//         div.setAttribute('data-appid', 'c1199f3c458b660154e8910a28eb1158');
//         div.setAttribute('data-spots', 'true'); // Added missing attribute
//         divRef.current.appendChild(div);
//     }, []); //rendered once, hence empty array
//
//     return <div ref={divRef}/>; // the widget returned as a div
// }
//
// export default WindyWidget;
