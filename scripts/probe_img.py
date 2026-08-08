import urllib.request as u
urls=[
 "/_next/image?url=%2Fimages%2Frecipes%2Fstuffed-medjool-dates.webp&w=640&q=75",
 "/_next/image?url=%2Fimages%2Fwellness%2Fbalanced-breakfast.webp&w=640&q=75",
 "/_next/image?url=%2Fimages%2Fingredients%2Fdate-harvest.webp&w=640&q=75",
 "/_next/image?url=%2Fimages%2Fhome%2Fcategories%2Ffresh-medjools-lifestyle.webp&w=640&q=75",
]
for x in urls:
  try:
    r=u.urlopen("http://localhost:3100"+x,timeout=25)
    print(x.split("%2F")[-1].split("&")[0], r.status, r.headers.get("content-type"))
  except Exception as e:
    print(x.split("%2F")[-1].split("&")[0], "ERR", e)
