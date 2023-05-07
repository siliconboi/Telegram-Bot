import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [fio, setFio] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            fio,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [fio, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send Order'
        })
    }, [])

    useEffect(() => {
        if(!street || !fio) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [fio, street])

    const onChangeFio = (e) => {
        setFio(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Enter Details</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Name'}
                value={fio}
                onChange={onChangeFio}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Location'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Online</option>
                <option value={'legal'}>Cash on Delivery</option>
            </select>
        </div>
    );
};

export default Form;
