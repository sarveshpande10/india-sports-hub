const ExploreVideos = ({ videoData }) => {
    return (
        <div className="outer">
            <h2 className="section-heading">Explore Videos</h2>
            <div className="video-content">
  
                <ul>
                    {videoData.map((video) => (
                        <li key={video.id} style={{listStyle: "none"}}>
                            <iframe width="230" height="170" src={video.link} frameBorder={0} title="YouTube video player"></iframe>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ExploreVideos