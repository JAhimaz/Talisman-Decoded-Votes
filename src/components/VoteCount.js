import '../css/VoteCount.css'

export default function VoteCount({talismanMember, position}){
    return (
        <div className='card-body'>
            <p><span className="title">{talismanMember.item.name}</span></p>
            <p><span className="highlight">{talismanMember.item.attributes.presenter}</span></p>
            <p>Position <span className="highlight">#{position}</span></p>
            <p>Votes: <span className="highlight">{talismanMember.count}</span></p>
        </div>
    )
}