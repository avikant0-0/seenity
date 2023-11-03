let PROJECT_ID = "fzto7fg7";
let DATASET = "production";

let QUERY = encodeURIComponent(`*[_type == "post"]
{title,body}`);

// Compose the URL for your project's endpoint and add the query
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

fetch(URL)
  .then((res) => {
    if (res.status == 200) {
      return res.json();
    } else {
      throw new Error("FAILED TO FETCH DATA");
    }
  })

  .then((data) => {
    console.log(data);

    const title = data.result[0].title;
    const body = data.result[0].body[0].children[0].text;
    document.getElementById("first").textContent = `${title}  ${body} `;
    // xd
  })

  .catch((error) => {
    console.error("Error:", error);
    datacontainer.innerHTML = "Failed to fetch data.";
  });

const imageElement = document.getElementById("imageElement");

let imagequery = encodeURIComponent(
  `*[_type == 'post']{"imageUrl": mainImage.asset->url}`
);

let imageURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${imagequery}`;

fetch(imageURL)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("FAILED TO FETCH IMAGE");
    }
  })
  .then((data) => {
    console.log(data.result[0].imageUrl);
    let imgurl = data.result[0].imageUrl;
    document.getElementById("imageElement").src = imgurl + "?h=400";
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function sendToSanity() {
  const myString = document.getElementById("myString").value;
  const projectId = "fzto7fg7";
  const dataset = "production";
  const token =
    "skDDKJCWQ1ADj1be7zxBoCM07eh7J6gHnINYI1kldrWfqB0ZHf62bMM41bfjPU6qoVsjyweeEocSO7gpmFW5RlSfotjKnevQO6iZGtkGyC70l3kZa34Tz6T2aFZHa6bpPv06iB14slKfOl6L279XCRz1C8LTzoc1JeOXEPgEQmO7u6ZBTcgR";

  const url = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`;
  const query = {
    mutations: [
      {
        create: {
          _type: "comments", // replace with your document type
          title: myString, // replace 'stringField' with the field name in your schema
        },
      },
    ],
  };

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(query),
  };
  const response = await fetch(url, options);
  const data = await response.json();

  console.log(data);
  document.getElementById("myString").value = "";
}
