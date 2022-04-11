import axios from 'axios';
import { useState, useEffect } from 'react';
import _, { takeWhile } from 'lodash';
import VoteCount from './VoteCount';

import '../css/VotesPoller.css'

export default function VotesPoller() {

    const[loading, setLoading] = useState(false);
    const[timestamp, setTimestamp] = useState()
    const[berlinData, setBerlinData] = useState()
    const[talismanData, setTalismanData] = useState([])
    // const[data, setData] = useState({})

    const checkLocation = (value) => {
        return value.item.attributes.location == "Berlin";
    }

    const getIndexOf = (taliObj) => {
        for(let index in berlinData) {
            if(berlinData[index] === taliObj) return index;
        }
        return -1;
    }

    const fetchCoins = async () => {
        setLoading(true);
        let url = `https://decoded-api.polkadot.network/results/flat`;
        await axios.get(url)
        .then((res) => {
            setTimestamp(res.data.timestamp);
            let data = res.data.results;

            const unsortedBerlinData = data.filter(checkLocation)

            const sortedfilteredData = _.orderBy(
                unsortedBerlinData,
                function(item) {
                    return item.count;
                },
                'desc'
            );
            
            setBerlinData(sortedfilteredData);
            
            let sortedTalismanData = []
            
            sortedfilteredData.forEach((talk, index) => {
                let nextPosVotes;
                if(talk.item.attributes.company == "Talisman"){
                    if(index !== 0){
                        nextPosVotes = sortedfilteredData[index - 1].count;
                    }else{
                        nextPosVotes = 0;
                    }

                    sortedTalismanData.push({...talk, index, nextPositionVotes: nextPosVotes })
                }
            });

            // sortedTalismanData.forEach(talk => {
            //     let nextPosVotes = 1;
            //     talk = {...talk, nextPositionVotes: nextPosVotes}
            // });

            console.log(sortedTalismanData)
            setTalismanData(sortedTalismanData)

            setLoading(false)
        });
    }

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <>
            {loading ? (
                <div className="card">
                    <div className='card-line'></div>
                    <div className='card-line-top'></div>
                    <div className='card-line-top'></div>
                    <div className='card-line-top'></div>
                    <div className='card-line-shortlisted'></div>
                </div>
            ):(
                <>
                <a className='timestamp'>Last updated : <span className="highlight">{new Date(timestamp).toLocaleTimeString("en-US")} {new Date(timestamp * 1000).toLocaleDateString("en-US")}</span></a>
                {talismanData.map((talisman) => 
                    <VoteCount talismanMember={talisman} key={talisman.item.name}/>
                )}
                </>
            )}
        </>
    )
}