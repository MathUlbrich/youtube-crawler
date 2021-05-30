function getFeed() {
    $.get("/api/feed", function(jsonResponse) {
        changeLoading(false);
        const doc = document.getElementById("contents");
        jsonResponse.results.forEach((r) => {
            doc.innerHTML += `
            <div class='youtube-card'>
                <div class='card' style='width: 18rem;'>
                    <img class='card-img-top thumbnail-image' src='${r.thumbnail}'>
                    <div class='card-body'>
                        <a href='${r.video}' class='btn btn-primary'>Video</a>
                    </div>
                </div>
            </div>`;
        });
    });
}

function changeLoading(isDisplay) {
    document.getElementById("loading-content").style.display= isDisplay ? null : "none";
}

getFeed();