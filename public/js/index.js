function getFeed() {
    $.get("/api/feed", function(jsonResponse) {
        changeLoading(false);
        const doc = document.getElementById("contents");
        jsonResponse.results.forEach((r) => {
            doc.innerHTML += `
            <div class="youtube-card">
                <div class="card" style="width: 18rem;">
                    <a href="${r.video}" target="_blank">
                        <img class="card-img-top thumbnail-image" src="${r.thumbnail}">
                    </a>
                    <div class="card-body">
                        <button id="btn-${r.id}" type="button" onclick="upvote('${r.id}')" class="btn btn-outline-success upvote-button">Upvote</button>
                    </div>
                </div>
            </div>`;
        });
    });
}

function upvote(videoId) {
    $.ajax({
        url: `/api/upvote/${videoId}`,
        type: 'PUT',
        success: function (response) {
            if (response.upvoted) {
                const element = document.getElementById(`btn-${videoId}`);
                element.disabled = true;
            }
        }
    });
}

function changeLoading(isDisplay) {
    document.getElementById("loading-content").style.display= isDisplay ? null : "none";
}

getFeed();