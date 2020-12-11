import React, { useState, useEffect } from 'react';
import { Group, Line, Text } from 'react-konva';
import Subwindow from '../../../subwindow'
import HeaderFromTo from '../../../headerToFrom'
import useCommand from '../../../../useCommand'
import WaypointInformation from './waypointInformation'
import getActiveIndex from '../../../getActiveIndex';
import addInteractiveInFPL from '../../../addInteractiveInFPL';
import Window from '../../../window';



function ActiveFlightPlanGrouped({ y, dataStore, departureData, approachData, arrivalData, pulse, active }) {
    function RenderDefaultString({ dataStore, dataLength }) {
        return (
            <Text
                text={dataStore[dataStore.length - 1].text[0]}
                y={25 * dataLength}
                fill={'cyan'}
                fontFamily={'Classic'}
                fontSize={14}
            />
        )
    }

    function RenderNormalEnroute({ dataStore }) {

        return (
            <>
                {
                    dataStore.length - 2 !== 0 && (
                        <Group y={(departureData.length) * 25}>
                            <Text text={'Enroute'} fill={'white'} fontFamily={'Frutiger'} fontSize={14} />
                            {
                                dataStore.map((item, i) => (
                                    i !== 0 && i !== dataStore.length - 1 && (
                                        <Group y={25 * i}>
                                            <Text text={item.text[0]} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dtk && `${item.dtk}°`} x={200} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dis && `${item.dis}NM`} x={260} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.alt} x={322} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        </Group>
                                    )
                                ))
                            }
                            {
                                approachData.length === 0 && arrivalData.length === 0 && (
                                    <RenderDefaultString dataStore={dataStore} dataLength={dataStore.length - 1} />
                                )
                            }
                        </Group>
                    )
                }
            </>
        )
    }


    function RenderClearEnroute({ departureData, approachData, arrivalData, dataStore }) {

        return (
            <>
                {
                    departureData.length === 0
                        && approachData.length === 0
                        && arrivalData.length === 0
                        ? dataStore.map((item, i) => {
                            if (i !== 0) {
                                return (
                                    <Group y={25 * i}>
                                        <Text text={item.text[0]} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        <Text text={item.dtk && `${item.dtk}°`} x={200} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        <Text text={item.dis && `${item.dis}NM`} x={260} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        <Text text={item.alt} x={322} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                    </Group>
                                )
                            }
                        })
                        : <RenderNormalEnroute dataStore={dataStore} />
                }
            </>
        )
    }


    function RenderDepartureData({ departureData }) {

        return (
            <>
                {
                    departureData.length !== 0 && (
                        <>
                            {
                                departureData.map((item, i) => (
                                    i === 0
                                        ? <Text text={item.text} fill={'white'} fontFamily={'Frutiger'} fontSize={14} />
                                        : <Group y={25 * i}>
                                            <Text text={item.text[0]} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dtk && `${item.dtk}°`} x={200} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dis && `${item.dis}NM`} x={260} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.alt} x={322} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        </Group>
                                ))
                            }
                            {
                                approachData.length === 0 && arrivalData.length === 0 && dataStore.length - 2 === 0 && (
                                    <RenderDefaultString dataStore={dataStore} dataLength={departureData.length} />
                                )
                            }
                        </>
                    )
                }
            </>
        )
    }


    function RenderArrvalData({ arrivalData }) {

        return (
            <Group y={((departureData.length) * 25) + ((dataStore.length - 2 !== 0 ? dataStore.length - 1 : 0) * 25)}>
                {
                    arrivalData.length !== 0 && (
                        <>
                            {
                                arrivalData.map((item, i) => (
                                    i === 0
                                        ? <Text text={item.text} fill={'white'} fontFamily={'Frutiger'} fontSize={14} />
                                        : <Group y={25 * i}>
                                            <Text text={item.text[0]} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dtk && `${item.dtk}°`} x={200} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dis && `${item.dis}NM`} x={260} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.alt} x={322} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        </Group>
                                ))
                            }
                            {
                                approachData.length === 0 && (
                                    <RenderDefaultString dataStore={dataStore} dataLength={arrivalData.length} />
                                )
                            }
                        </>
                    )
                }
            </Group>
        )
    }


    function RenderApproachData({ approachData }) {

        return (
            <Group y={((departureData.length) * 25) + ((dataStore.length - 2 !== 0 ? dataStore.length - 1 : 0) * 25) + ((arrivalData.length)) * 25}>
                {
                    approachData.length !== 0 && (
                        <>
                            {
                                approachData.map((item, i) => (
                                    i === 0
                                        ? <Text text={item.text} fill={'white'} fontFamily={'Frutiger'} fontSize={14} />
                                        : <Group y={25 * i}>
                                            <Text text={item.text[0]} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dtk && `${item.dtk}°`} x={200} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.dis && `${item.dis}NM`} x={260} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                            <Text text={item.alt} x={322} fill={'cyan'} fontFamily={'Classic'} fontSize={14} />
                                        </Group>
                                ))
                            }
                            <RenderDefaultString dataStore={dataStore} dataLength={approachData.length} />
                        </>
                    )
                }
            </Group>
        )
    }

    // set item number
    const [scroll, setScroll] = useState(0)

    return (
        <Group y={y}>
            <Group y={-scroll * 25}>
                <RenderClearEnroute
                    departureData={departureData}
                    approachData={approachData}
                    arrivalData={arrivalData}
                    dataStore={dataStore}
                />
                <RenderDepartureData departureData={departureData} />
                <RenderArrvalData arrivalData={arrivalData} />
                <RenderApproachData approachData={approachData} />
            </Group>
        </Group>
    )
}


function ActiveFlightPlanSubwindow({
    x,
    y,
    pulse,
    active,
    waypointWindowVisible,
    setWaypointWindowVisible,
    width,
    height
}) {
    const dtkDefaultStr = '___'
    const disDefaultStr = '____'
    const altDefaultStr = '_____'


    const arrivalData = [
        {
            text: 'Arrival - WAAA-PINTO.DELTA.ALL'
        },
        {
            text: ['RINTO'],
            dtk: dtkDefaultStr,
            dis: disDefaultStr,
            alt: altDefaultStr
        },
        {
            text: ['00MK3'],
            dtk: dtkDefaultStr,
            dis: disDefaultStr,
            alt: altDefaultStr
        },
        {
            text: ['MK60B'],
            dtk: dtkDefaultStr,
            dis: disDefaultStr,
            alt: altDefaultStr
        },
        {
            text: ['MKS'],
            dtk: dtkDefaultStr,
            dis: disDefaultStr,
            alt: altDefaultStr
        },
    ]

    const approachData = [
        {
            text: 'VTF Apr - ME49-GPS 198° LNAV'
        },
        {
            text: ['HAXUS'],
            dtk: '',
            dis: '',
            alt: ''
        },
        {
            text: ['HASMO', 'faf'],
            dtk: 198,
            dis: '2.7',
            alt: 2600
        },
        {
            text: ['WUBIM', 'map'],
            dtk: 198,
            dis: '2.0',
            alt: ''
        },
        {
            text: ['1500FT'],
            dtk: 198,
            dis: '0.5',
            alt: 1500
        },
        {
            text: ['ZUBAR', 'mahp'],
            dtk: '',
            dis: '',
            alt: 4600
        },
        {
            text: ['HOLD'],
            dtk: 198,
            dis: '4.0',
            alt: ''
        },
    ]

    const departureData = [
        {
            text: 'Departure - HAAB-RW07L.ASOL1A.ASOLE'
        },
        {
            text: ['RW07L'],
            dtk: '',
            dis: '',
            alt: ''
        },
        {
            text: ['8060FT'],
            dtk: 102,
            dis: '5781',
            alt: 8060
        },
        {
            text: ['D077S'],
            dtk: 103,
            dis: '18.4',
            alt: '12500'
        },
    ]

    const defaultTitleValue11 = '______'
    const defaultTitleValue12 = '/'
    const defaultTitleValue13 = '______'

    const defaultAirportValue = '__________'

    const [titleValue, setTitleValue] = useState([
        defaultTitleValue11,
        defaultTitleValue12,
        defaultTitleValue13
    ])


    const getDefaultTitleValue = () =>
        `${titleValue[0]}  ${titleValue[1]} ${titleValue[2]}`

    const [dataStore, setDataStore] = useState([
        {
            text: getDefaultTitleValue(),
            active: true,
            width: 200,
            coordinates: { x: 10, y: 0 }
        },
        {
            text: ['K'],
            dtk: '',
            dis: '',
            alt: ''
        },
        {
            text: ['M'],
            dtk: dtkDefaultStr,
            dis: disDefaultStr,
            alt: altDefaultStr
        },
        {
            text: [defaultAirportValue],
            active: false,
            width: 110
        },
    ])


    const [headerStore, setHeaderStore] = useState({
        alphabetCounter: 0,
        input: false,
        userTextSelected: '____________________'
    })

    const [activeItemIndex, setActiveItemIndex] = useState(
        getActiveIndex(dataStore)
    )

    useEffect(() => {
        setActiveItemIndex(
            getActiveIndex(dataStore)
        )
    }, [dataStore.length])


    const [outerButtonProcessing, innerButtonProcessing] = addInteractiveInFPL(
        dataStore,
        setDataStore,
        headerStore,
        setHeaderStore,
        activeItemIndex,
        setActiveItemIndex,
    )


    useCommand('iSim/G1000/n1_fms_outer_up', () => {
        if (active) {
            outerButtonProcessing('up')
        }
    })
    useCommand('iSim/G1000/n1_fms_outer_dn', () => {
        if (active) {
            outerButtonProcessing('dn')
        }
    })
    useCommand('iSim/G1000/n1_fms_inner_up', () => {
        if (active) {
            innerButtonProcessing('up')
            if (activeItemIndex > 0) {
                setWaypointWindowVisible(!waypointWindowVisible)
            }
        }
    })
    useCommand('iSim/G1000/n1_fms_inner_dn', () => {
        if (active) {
            innerButtonProcessing('dn')
            if (activeItemIndex > 0) {
                setWaypointWindowVisible(!waypointWindowVisible)
            }
        }
    })
    useCommand('iSim/G1000/n1_fms_push', () => {
    })


    return (
        <Group x={x} y={y}>
            <Group x={20}>
                <HeaderFromTo
                    headerStore={headerStore}
                    dataStoreItem={dataStore[0]}
                    fill={'cyan'}
                    pulse={active ? pulse : false}
                />
                <Group clip={{ x: 0, y: 65, width: width - 20, height: height - 85 }}>
                    <ActiveFlightPlanGrouped
                        y={65}
                        dataStore={dataStore}
                        departureData={departureData}
                        approachData={approachData}
                        arrivalData={arrivalData}
                        pulse={pulse}
                        active={active}
                    />
                </Group>
            </Group>
            <Group x={220} y={42}>
                <Text text={'DTK'} fill={'white'} fontFamily={'Classic'} fontSize={10} />
                <Text x={60} text={'DIS'} fill={'white'} fontFamily={'Classic'} fontSize={10} />
                <Text x={120} text={'ALT'} fill={'white'} fontFamily={'Classic'} fontSize={10} />
            </Group>
            <Line points={[-10, 55, 430, 55]} fill={'white'} stroke={'white'} strokeWidth={1} />
        </Group>
    )
}


function CurrentVnvProfile({ x, y, dataForCVP }) {

    return (
        <Group x={x} y={y}>
            <Group>
                <Text text={'ACT VNV WPT'} fill={'white'} fontSize={13} fontFamily={'Classic'} />
                <Text x={95} text={`${dataForCVP.actVnvWptText}FT`} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
                <Text x={170} text={'AT'} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
                <Text x={200} text={dataForCVP.actVnvWptTextAt} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
            </Group>
            <Group y={25}>
                <Text text={'VS TGT'} fill={'white'} fontSize={13} fontFamily={'Classic'} />
                <Text x={65} text={`${dataForCVP.vsTgt}FPM`} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
                <Text x={155} text={'FPA'} fill={'white'} fontSize={13} fontFamily={'Classic'} />
                <Text x={210} text={`${dataForCVP.fpa}°`} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
            </Group>
            <Group y={50}>
                <Text text={'VS REQ'} fill={'white'} fontSize={13} fontFamily={'Classic'} />
                <Text x={65} text={`${dataForCVP.vsReq}FPM`} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
                <Text x={155} text={'V DEV'} fill={'white'} fontSize={13} fontFamily={'Classic'} />
                <Text x={210} text={`${dataForCVP.vDev}FT`} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
                <Text x={285} text={'TOD'} fill={'white'} fontSize={13} fontFamily={'Classic'} />
                <Text x={325} text={`${dataForCVP.tod1}:${dataForCVP.tod2}`} fill={'cyan'} fontSize={13} fontFamily={'Classic'} />
            </Group>
        </Group>
    )
}

function SelectedWaypointWeather(props) {
    return (
        <Group {...props}>

        </Group>
    )
}

function ActiveFlightPlan({ x, y, type, active }) {
    const windowSize = { width: 460, height: 723 }

    const [waypointWindowVisible, setWaypointWindowVisible] = useState(false)
    // const [waypointWindowVisible, setWaypointWindowVisible] = useState(true)


    // CVP - current vnv profile
    const [dataForCVP, setDataForCVP] = useState({
        actVnvWptText: 15487,
        actVnvWptTextAt: 'FF18',
        vsTgt: 57429,
        fpa: 7815,
        vsReq: 47519,
        vDev: 47519,
        tod1: 15,
        tod2: 74,
        // actVnvWptText: '_____',
        // actVnvWptTextAt: '__________',
        // vsTgt: '_____',
        // fpa: '____',
        // vsReq: '_____',
        // vDev: '_____',
        // tod1: '__',
        // tod2: '__',
    })

    return (
        <Window
            title=""
            x={x}
            y={y}
            width={windowSize.width}
            height={windowSize.height}
            type={type}
            fill={'#202020'}
            stroke={'white'}
            strokeWidth={1}
            render={(props) =>
                <Group {...props}>
                    <Subwindow
                        y={20}
                        width={windowSize.width - 20}
                        height={380}
                        title={'ACTIVE FLIGHT PLAN'}
                        render={(props) =>
                            <ActiveFlightPlanSubwindow
                                {...props}
                                active={waypointWindowVisible ? false : active}
                                waypointWindowVisible={waypointWindowVisible}
                                setWaypointWindowVisible={setWaypointWindowVisible}
                                width={windowSize.width - 20}
                                height={380}
                            />
                        } />
                    <Subwindow
                        y={420}
                        width={windowSize.width - 20}
                        height={90}
                        title={'CURRENT VNV PROFILE'}
                        zIndex={999}
                        render={(props) =>
                            <CurrentVnvProfile {...props} dataForCVP={dataForCVP} />
                        } />
                    <Subwindow
                        y={530}
                        width={windowSize.width - 20}
                        height={100}
                        title={'SELECTED WAYPOINT WEATHER'}
                        render={(props) =>
                            <SelectedWaypointWeather {...props} />
                        } />
                    <Text
                        y={670}
                        fill={'white'}
                        fontFamily={'Frutiger'}
                        x={20}
                        width={windowSize.width - 60}
                        align={'center'}
                        fontSize={15}
                        text={'Press the "FPL" key to view the previous page'}
                    />
                    {
                        waypointWindowVisible && <WaypointInformation zIndex={9} x={229} y={1} type={type} />
                    }
                </Group>
            } />
    )
}

export default ActiveFlightPlan;