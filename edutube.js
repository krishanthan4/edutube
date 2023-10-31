  document.addEventListener("DOMContentLoaded", function () { 
    
    
    // Replace with your YouTube Data API key
    const apiKey = "AIzaSyC0YAOT-zZHaP5gAXJSdII3p3i26aGcO78";

    let totalVideos = 0;
    let completedVideos = 0;
    let currentVideoIndex = 0;
    let videoIds = [];

    function updatePlaylistName(playlistName) {
      const playlistNameElement = document.getElementById("playlist-name");
      playlistNameElement.textContent = playlistName;
    }

    function goToPreviousPage() {
      if (window.history.length > 1) {
        // If there is a history, go back to the previous page
        window.history.back();
      } else {
        // If there is no history, redirect to index.html
        window.location.href = "index.html";
      }
    }

    function createImageElement(src, alt, id) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.id = id;
      img.classList.add("mr-2", "w-5", "h-5"); // Adjust width and height as needed
      return img;
    }

    function fetchPlaylistVideos(playlistId) {
      fetch(
        `https://www.googleapis.com/youtube/v3/playlists?key=${apiKey}&part=snippet&id=${playlistId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            let playlistName = data.items[0].snippet.title;
            updatePlaylistName(playlistName);
          }
        });
      fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet&maxResults=50`
      )
        .then((response) => response.json())
        .then((data) => {
          totalVideos = data.items.length;
          updateProgressBar();
          const videoList = document.getElementById("video-list");
          videoList.innerHTML = "";
         

          videoIds = data.items.map(
            (item) => item.snippet.resourceId.videoId
          );

          data.items.forEach((item) => {
            const videoTitle = item.snippet.title;
            const listItem = document.createElement("li");
            listItem.style.display="flex";

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
imageA.style.display="none";
            listItem.appendChild(document.createTextNode(videoTitle)); // Set text content after appending images
            listItem.addEventListener("click", () => {
              const index = data.items.findIndex(
                (i) => i.snippet.title === videoTitle
              );
              displayVideo(index);
            });
            videoList.appendChild(listItem);


          });

          // Automatically play the first video after loading the playlist
          if (totalVideos > 0) {
            displayVideo(0);
          }
          // if (data.nextPageToken) {
          //   // Fetch the next page recursively
          //   fetchPlaylistVideos(playlistId, data.nextPageToken);
          // }
        })
        .catch((error) => {
          console.error("Error fetching playlist videos:", error);
        });
    }

    var sidebar = document.getElementById("side_bar");
    // Get the toggle button element
    var toggleButton = document.getElementById("toggle1");
    var maindiv = document.getElementById("maindiv");
    var navbar = document.getElementById("nav");
    // Add a click event listener to the toggle button
    function toggleSidebar() {
      // Toggle the sidebar's visibility by adding or removing the 'hidden' class
      sidebar.classList.toggle("hidden");
      // Toggle the maindiv's width and background color
      if (maindiv.style.width === "100vw") {
        navbar.style.width="75%";
        maindiv.style.width = "75%"; // Equivalent to lg:w-3/4
        maindiv.style.maxWidth = "100%"; // Equivalent to md:w-2/4
        maindiv.style.backgroundColor = "#E5E7EB"; // Equivalent to bg-gray-200
        maindiv.style.height = "100vh"; // Equivalent to h-screen
        maindiv.style.overflowY = "scroll";
      } else {
        navbar.style.width="100%";
        maindiv.style.width = "100vw";
        maindiv.style.backgroundColor = "#E5E7EB";
        maindiv.style.height = "100vh";
        maindiv.style.overflowY = "scroll";
      }
    }
    function toggleImages(completed) {
    const videoId = videoIds[currentVideoIndex];
    const imageA = document.getElementById(`${videoId}-a`);
    const imageB = document.getElementById(`${videoId}-b`);

    if (imageA && imageB) {
        if (completed) {
            // Hide image B and show image A to indicate completion status
            imageB.style.display = "none";
            imageA.style.display = "inline";
        } else {
            // Show image B and hide image A in the default view
            imageB.style.display = "inline";
            imageA.style.display = "none";
        }
    }
}
    // Add a click event listener to the toggle button, calling the toggleSidebar function
    toggleButton.addEventListener("click", toggleSidebar);
    function displayVideo(index) {
      currentVideoIndex = index;
      const videoFrame = document.getElementById("video-frame");
      videoFrame.src = `https://www.youtube.com/embed/${videoIds[index]}?modestbranding=1&rel=0&autoplay=1`;
    }

    // Previous Video button functionality
    const previousVideoButton = document.getElementById("previous-video");
    previousVideoButton.addEventListener("click", () => {
      if (currentVideoIndex > 0) {
        currentVideoIndex--;
        displayVideo(currentVideoIndex);
      }
    });

// Complete button functionality for button with id="complete1"
const completeButton1 = document.getElementById("complete1");
completeButton1.addEventListener("click", () => {
    // Logic specific to completeButton1
    // For example, you can add different actions here
    toggleImages(true);
    completedVideos++;

    if (currentVideoIndex < totalVideos - 1) {
        currentVideoIndex++;
        displayVideo(currentVideoIndex);
        toggleImages(false);
    }

    updateProgressBar();
});

// Complete button functionality for button with id="complete2"
const completeButton2 = document.getElementById("complete2");
completeButton2.addEventListener("click", () => {
    // Logic specific to completeButton2
    // For example, you can add different actions here
    toggleImages(true);
    completedVideos++;

    if (currentVideoIndex < totalVideos - 1) {
        currentVideoIndex++;
        displayVideo(currentVideoIndex);
        toggleImages(false);
    }

    updateProgressBar();
});

    // Function to update progress bar based on completed videos
    function updateProgressBar() {
      const progressBar = document.getElementById("progress-bar");
      const progressBarbar = document.getElementById("progress-barbar");
      const progressPercentage = Math.floor(
        (completedVideos / totalVideos) * 100
      );
      if (progressPercentage >= 100) {
        // If progress is 100% or more, set width to 100%
        progressBarbar.style.width = "100%";
        progressBar.textContent = "100% Complete";
        // Disable the complete button
        document.getElementById("complete").disabled = true;
      } else {
        progressBarbar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${progressPercentage}% Complete`;
      }
    }
    
    // Set the playlist link dynamically (you can set this based on the course selected)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playlistLink = urlParams.get("playlist");
    if (playlistLink) {
      const sanitizedPlaylistLink = decodeURIComponent(playlistLink);
      const regex = /list=([A-Za-z0-9_-]+)/;
      const match = sanitizedPlaylistLink.match(regex);

      if (match && match[1]) {
        const playlistId = match[1];
        fetchPlaylistVideos(playlistId);
      } else {
        alert("Invalid or unsupported YouTube playlist link.");
      }
    } else {
      // Handle no playlist link provided
      alert("No playlist link provided.");
    }
  });
