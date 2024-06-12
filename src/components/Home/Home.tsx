/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { Spin, Breadcrumb, Slider, InputNumber, Select, Button } from 'antd';
// import { getAll } from '../../redux/actions/headphones';
import { getAll } from '../../redux/actions/headphones';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

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

const Home = (props: any) => {
    const navigate = useNavigate();
    const [headphoneMinPriceSelected, setHeadphoneMinPriceSelected] = useState<any>();
    const [headphoneMaxPriceSelected, setHeadphoneMaxPriceSelected] = useState<any>();
    const [headphoneManufacturersSelected, setHeadphoneManufacturersSelected] = useState('');
    const [headphoneColorsSelected, setHeadphonesColorsSelected] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAll()
        setHeadphonesColorsSelected(getColors(props.headphones));
        setHeadphoneManufacturersSelected(getManufacturers(props.headphones));
        setHeadphoneMinPriceSelected(getMinPrice(props.headphones));
        setHeadphoneMaxPriceSelected(getMaxPrice(props.headphones))
        setLoading(false);
    }, [])

    const getMinPrice = (headphones: Headphone[]) => Math.min.apply(Math, headphones && headphones.map(headphone => headphone.price));
    const getMaxPrice = (headphones: Headphone[]) => Math.max.apply(Math, headphones && headphones.map(headphone => headphone.price));

    const getColors = (headphones: any) => headphones?.reduce((arrColors: any, headphone: any) => {
        if (!arrColors.includes(headphone.color)) { arrColors.push(headphone.color); }
        return arrColors;
    }, [])

    const getManufacturers = (headphones: Headphone[]) => headphones && headphones.reduce((arr: any, headphone: any) => {
        if (!arr.includes(headphone.manufacturer)) { arr.push(headphone.manufacturer); }
        return arr;
    }, []);

    const colors = getColors(props.headphones);
    const manufacturers = getManufacturers(props.headphones);
    const minPrice = getMinPrice(props.headphones);
    const maxPrice = getMaxPrice(props.headphones);

    const onChangePrice = (value: any) => {
        onChangeMinPrice(value[0]);
        onChangeMaxPrice(value[1]);
    }
    const onChangeMinPrice = (value: any) => {
        setHeadphoneMinPriceSelected(value);
    }
    const onChangeMaxPrice = (value: any) => {
        setHeadphoneMaxPriceSelected(value);
    }

    function handleChangeColor(value: any) {
        setHeadphonesColorsSelected(value);
    }

    function handleChangeManufacturer(value: any) {
        setHeadphoneManufacturersSelected(value);
    }

    const showHeadphoneDetails = (phone_id: any) => {
        navigate('/headphone/'+ phone_id);
    }

    return (
        <div className="home-container">
            <div className="breadcrumbs">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Headphones</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {
                loading && <div className="spin"><Spin size="large" /></div>
            }

            {props.headphones?.length > 0 && !loading &&
                <Fragment>
                    <div className="filters">
                        <div className="filter">
                            <div className="filter-label">Filter by brand:</div>
                            <Select mode="multiple" style={{ width: 320 }} placeholder="Please select"
                                defaultValue={manufacturers} onChange={handleChangeManufacturer} >
                                {manufacturers?.map((manufacturer: any) => <Option key={manufacturer}>{manufacturer}</Option>)}
                            </Select>
                        </div>
                        <div className="filter">
                            <div className="filter-label">Filter by price:</div>
                            <div>
                                From <InputNumber min={minPrice} max={maxPrice} value={headphoneMinPriceSelected} onChange={onChangeMinPrice} formatter={value => `${value} €`} style={{ margin: '0 16px' }} />
                                to <InputNumber min={minPrice} max={maxPrice} value={headphoneMaxPriceSelected} onChange={onChangeMaxPrice} formatter={value => `${value} €`} style={{ margin: '0 16px' }} />
                            </div>
                            <Slider range step={1} min={minPrice} max={maxPrice} defaultValue={[minPrice, maxPrice]} value={[headphoneMinPriceSelected, headphoneMaxPriceSelected]} onChange={onChangePrice} style={{ minWidth:250 }} />
                        </div>
                        <div className="filter">
                            <div className="filter-label">Filter by color:</div>
                            <Select mode="multiple" style={{ width: 270 }} placeholder="Please select"  defaultValue={colors} onChange={handleChangeColor}>
                                {colors?.map((color: any) => <Option key={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</Option>)}
                            </Select>
                        </div>
                    </div>

                    <div className="headphones-container">
                        <div className="headphone-container">
                            {props.headphones?.filter((headphone: any) =>
                                headphone.price >= headphoneMinPriceSelected &&
                                headphone.price <= headphoneMaxPriceSelected &&
                                headphoneColorsSelected.includes(headphone.color) &&
                                headphoneManufacturersSelected.includes(headphone.manufacturer)).map((headphone: any) => (
                                    <div className="headphone-in-catalogue-container" key={headphone.id} onClick={showHeadphoneDetails.bind(this, headphone.id)}>
                                        <div className="headphone-image">
                                            <img src={'/data/' + headphone.imageFileName} />
                                        </div>
                                        <h2 className="name">{headphone.name}</h2>
                                        <h2 className="price">{headphone.price} €</h2>
                                        <div className="see-details-button">
                                            <Button type="primary" style={{width:'100%'}}>See details</Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}



const mapStateToProps = ({headphone}: {headphone: any}) => ({ headphones: headphone.headphone.headphones })
export default connect(mapStateToProps)(Home);