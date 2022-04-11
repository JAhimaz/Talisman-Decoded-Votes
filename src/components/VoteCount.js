import '../css/VoteCount.css'

export default function VoteCount({talismanMember}){
    return (
        <div className='card-body'>
            <p><span className="title">{talismanMember.item.name}.</span></p>
            <p><span className="highlight">{talismanMember.item.attributes.presenter}</span></p>
            <p>Position <span className="highlight">#{talismanMember.index}</span></p>
            <p>Votes: <span className="highlight">{talismanMember.count} <span className='foreground'>(Next Position Votes: {talismanMember.nextPositionVotes})</span></span></p>
            <p className='Top-list'>Shortlisted: <span className={talismanMember.top ? "green-highlight" : "highlight"}>{talismanMember.top.toString().toUpperCase()}</span></p>
        </div>
    )
}