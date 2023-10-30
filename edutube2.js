document.addEventListener("DOMContentLoaded", function () {
  
  let totalVideos2 = 0;
  let completedVideos2 = 0;
  let currentVideoIndex2 = 0;
  let videoIds2 = [];
  
  const offcanvas = document.getElementById("offcanvas");
  const offcanvasOverlay = document.getElementById("offcanvas-overlay");
  const offcanvasToggle = document.getElementById("offcanvas-toggle");

  offcanvasToggle.addEventListener("click", () => {
    offcanvas.classList.toggle("hidden");
  });

  offcanvasOverlay.addEventListener("click", () => {
    if (!offcanvas.classList.contains("hidden")) {
      offcanvas.classList.add("hidden");
    }
  });
  // Replace with your YouTube Data API key
  const apiKey = "AIzaSyC0YAOT-zZHaP5gAXJSdII3p3i26aGcO78";

  function updatePlaylistName2(playlistName) {
    const playlistNameElement2 = document.getElementById("playlist-name2");
    playlistNameElement2.textContent = playlistName;
  }

  function createImageElement(src, alt, id) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.id = id;
    img.classList.add("mr-2", "w-5", "h-5"); // Adjust width and height as needed
    return img;
  }

  function fetchPlaylistVideos2(playlistId) {
    fetch(
      `https://www.googleapis.com/youtube/v3/playlists?key=${apiKey}&part=snippet&id=${playlistId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          let playlistName = data.items[0].snippet.title;
          updatePlaylistName2(playlistName);
        }
      });
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=50`
    )
      .then((response) => response.json())
      .then((data) => {
        totalVideos2 = data.items.length;
        updateProgressBar2();
        const videoList2 = document.getElementById("video-list2");
        videoList2.innerHTML = "";

        videoIds2 = data.items.map((item) => item.snippet.resourceId.videoId);

        data.items.forEach((item) => {
          const videoTitle = item.snippet.title;
          const listItem = document.createElement("li");
          listItem.style.display = "flex";

          listItem.classList.add(
            "cursor-pointer",
            "text-black",
            "hover:bg-gray-400",
            "text-md",
            "border",
            "py-2",
            "px-1",
            "bg-slate-100",
            "border-slate-300"
          );

          const imageA = createImageElement(
            "./public/svgs/solid/circle-check.svg",
            "Image A",
            `${item.snippet.resourceId.videoId}-a`
          );
          const imageB = createImageElement(
            "./public/svgs/regular/circle.svg",
            "Image B",
            `${item.snippet.resourceId.videoId}-b`
          );
          listItem.appendChild(imageB);
          listItem.appendChild(imageA);
          imageA.style.display = "none";
          listItem.appendChild(document.createTextNode(videoTitle)); // Set text content after appending images
          listItem.addEventListener("click", () => {
            const index = data.items.findIndex(
              (i) => i.snippet.title === videoTitle
            );
            displayVideo2(index);
            toggleImages2(false);
          });
          videoList2.appendChild(listItem);
        });

        // Automatically play the first video after loading the playlist
        if (totalVideos2 > 0) {
          displayVideo2(0);
        }
        if (data.nextPageToken) {
          // Fetch the next page recursively
          fetchPlaylistVideos2(playlistId, data.nextPageToken);
        }
      })
      .catch((error) => {
        console.error("Error fetching playlist videos:", error);
      });
  }
  function updateProgressBar2() {
    const progressBar2 = document.getElementById("progress-bar2");
    const progressBarbar2 = document.getElementById("progress-barbar2");
    const progressPercentage2 = Math.floor(
      (completedVideos2 / totalVideos2) * 100
    );
    if (progressPercentage2 >= 100) {
      // If progress is 100% or more, set width to 100%
      progressBarbar2.style.width = "100%";
      progressBar2.textContent = "100% Complete";
      // Disable the complete button
      document.getElementById("complete").disabled = true;
    } else {
      progressBarbar2.style.width = `${progressPercentage2}%`;
      progressBar2.textContent = `${progressPercentage2}% Complete`;
    }
  }

  const completeButton11 = document.getElementById("complete1");
  completeButton11.addEventListener("click", () => {
      // Logic specific to completeButton1
      // For example, you can add different actions here
      toggleImages2(true);
      completedVideos2++;
  
      if (currentVideoIndex2 < totalVideos2 - 1) {
          currentVideoIndex2++;
          displayVideo2(currentVideoIndex2);
          toggleImages2(false);
      }
  
      updateProgressBar2();
  });
  
  function displayVideo2(index) {
    currentVideoIndex2 = index;

  }
  const completeButton2 = document.getElementById("complete2");
  completeButton2.addEventListener("click", () => {
    // Logic specific to completeButton2
    // For example, you can add different actions here
    toggleImages2(true);
    completedVideos2++;

    if (currentVideoIndex2 < totalVideos2 - 1) {
      currentVideoIndex2++;
      displayVideo2(currentVideoIndex2);
      toggleImages2(false);
    }

    updateProgressBar2();
  });
  function toggleImages2(completed) {
    const videoId2 = videoIds2[currentVideoIndex2];
    const imageA2 = document.getElementById(`${videoId2}-a`);
    const imageB2 = document.getElementById(`${videoId2}-b`);

    if (imageA2 && imageB2) {
        if (completed) {
            // Hide image B and show image A to indicate completion status
            imageB2.style.display = "none";
            imageA2.style.display = "inline";
        } else {
            // Show image B and hide image A in the default view
            imageB2.style.display = "inline";
            imageA2.style.display = "none";
        }
    }
}
  const queryString2 = window.location.search;
  const urlParams2 = new URLSearchParams(queryString2);
  const playlistLink2 = urlParams2.get("playlist");
  if (playlistLink2) {
    const sanitizedPlaylistLink2 = decodeURIComponent(playlistLink2);
    const regex = /list=([A-Za-z0-9_-]+)/;
    const match = sanitizedPlaylistLink2.match(regex);

    if (match && match[1]) {
      const playlistId = match[1];
      fetchPlaylistVideos2(playlistId);
    } else {
      alert("Invalid or unsupported YouTube playlist link.");
    }
  } else {
    // Handle no playlist link provided
    alert("No playlist link provided.");
  }

});
