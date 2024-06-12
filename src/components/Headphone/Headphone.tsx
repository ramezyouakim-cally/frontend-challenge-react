/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Headphone.css';
import { Spin, Breadcrumb } from 'antd';
import NotFound from '../NotFound/NotFound';
import { getAll } from '../../redux/actions/headphones';
import BatteryLife from '../../data/battery-life.svg';
import Weight from '../../data/weight.svg';
import Mic from '../../data/mic.svg';

interface Headphone {
    id: string
    name: string
    manufacturer: string
    description: string
    color: string
    price: number
    imageFileName: string
    type: string
    wireless: boolean
    batteryLife: string
    noiseCancellationType: string
    weight: string
    mic: boolean
}


const Headphone = (props: any) => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [currentHeadphone, setCurrentHeadphone] = useState<Headphone>();
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAll()
        const headphone = props.headphones?.filter((p: any) => p.id == id)[0];

        if (headphone) {
            setCurrentHeadphone(headphone)
        } else {
            setNotFound(true)
        }
        setLoading(false);
}, [])

    const goHome = () => {
        navigate('/');
    }

    console.log('src/data/' + currentHeadphone?.imageFileName);

    return (
        <div className="headphone-container">
            {notFound && <NotFound />}

            {loading && <Spin size="large" />}

            {currentHeadphone && <div className="headphone">
                <div className="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a onClick={goHome}>Headphones</a></Breadcrumb.Item>
                        <Breadcrumb.Item>{currentHeadphone?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="headphone-details-container" key={currentHeadphone.id}>
                    <div className="headphone-details">
                        <div className="details-container">
                            <div className="image">
                                {/* <img src={'src/data/' + currentHeadphone.imageFileName} alt="Headphone image" /> */}
                                <img src={'/data/' + currentHeadphone.imageFileName} alt="Headphone image" />
                            </div>
                            <div className="info">
                                <h1>
                                    <span>{currentHeadphone.name} </span>
                                    <span>({currentHeadphone.manufacturer})</span>
                                </h1>
                                <h1 className="price">{currentHeadphone.price} €</h1>
                                <div className="color">
                                    <h3>Color:</h3>
                                    <div className="circle" style={{backgroundColor:currentHeadphone.color}}></div>
                                </div>

                                <p>{currentHeadphone.description}</p>
                            </div>
                        </div>
                        <div className="specifications-container">
                            <h2>Technical Specifications</h2>
                            <div className="specifications">
                                <div className="specification">
                                    <img src={BatteryLife} alt="Battery life"/>
                                    <p>Battery Life</p>
                                    <h4>{currentHeadphone.batteryLife}</h4>
                                </div>
                                <div className="specification">
                                    <img src={Weight} alt=""/>
                                    <p>Weight</p>
                                    <h4>{currentHeadphone.weight}</h4>
                                </div>
                                <div className="specification">
                                    <img src={Mic} alt=""/>
                                    <p>Microphone</p>
                                    <h4>{currentHeadphone.mic ? 'Yes': 'No'}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

const mapStateToProps = ({headphone}: {headphone: any}) => ({ headphones: headphone.headphone.headphones });
export default connect(mapStateToProps)(Headphone);