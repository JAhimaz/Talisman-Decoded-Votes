import axios from 'axios';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import VoteCount from './VoteCount';

export default function VotesPoller() {

    const[loading, setLoading] = useState(false);
    const[timestamp, setTimestamp] = useState()
    const[berlinData, setBerlinData] = useState()
    const[talismanData, setTalismanData] = useState([])
    // const[data, setData] = useState({})

    const checkLocation = (value) => {
        return value.item.attributes.location == "Berlin";
    }

    const checkForTalisman = (value) => {
        return value.item.attributes.company == "Talisman";
    }

    const fetchTalismanData = (datasheet) => {
        let talData = datasheet.filter(checkForTalisman)
        console.log(talData)
        setTalismanData(talData)
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
            fetchTalismanData(sortedfilteredData);

            console.log(sortedfilteredData)
            setLoading(false)
        });
    }

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <>
            {loading ? (
                <a>Fetching Votes...</a>
            ):(
                <>
                <a className='timestamp'>Last updated : <span className="highlight">{new Date(timestamp).toLocaleTimeString("en-US")} {new Date(timestamp * 1000).toLocaleDateString("en-US")}</span></a>
                {talismanData.map((talisman) => 
                    <VoteCount talismanMember={talisman} position={getIndexOf(talisman)}/>
                )}
                </>
            )}
        </>
    )
}