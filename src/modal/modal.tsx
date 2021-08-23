// import {createPortal} from 'react-dom'

// const Modal = () => {
//     return createPortal(
//         <div className="modal">
//             <div className="modal-content">
//                 Modal
//             </div>
//         </div>
//         ,document.querySelector('#modall')
//     )
// }

// export default Modal
import React from 'react';
import { createPortal } from 'react-dom'

const Portal = ({ children,targetElement }: any) => {
    const el:any = document.getElementById("modall")
    return createPortal(children,targetElement.current)
}


const Modal = (props: any) => {
    return (
          <>
            {props.show ? <Portal targetElement={props.elementRef}>
                <div>
            <div>
                Red pieces
            </div>
            <div>Blue Pieces</div>
            </div>
            </Portal> : null}

        </>
    )
}
export default Modal;