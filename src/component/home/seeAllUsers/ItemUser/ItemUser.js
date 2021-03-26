import React from 'react'
import '../ItemUser/ItemUser.css'
import optionIcon from '../../../../img/option_icon.png'


export const ItemUser = () => {
    return (
        <tr className="usertab-fila">
            <th scope="row" className="usertab-user-image-table"><img className="usertab-user-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRyv9Dkf8Wusb0uForhlXoz090E0Xgt_1OQ&usqp=CAU" /></th>
            <td>1122334455</td>
            <td>Carmen Cardozo</td>
            <td><button className="usertab-options"><img className="usertab_icon_image" src={optionIcon}/></button></td>
        </tr>
    )
}
