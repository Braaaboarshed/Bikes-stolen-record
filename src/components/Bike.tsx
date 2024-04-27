import React from 'react'

const Bike = ({item}:any) => {
  return (
    <div className="card">
    <div className="card-content">
      <h2 className="title">case title :{item?.title}</h2>
{      item?.description?.length >0 ? <h4 className="desc"> description : {item?.description} </h4>  : <h4 className="desc"> description : No descrition </h4>}
      <h4 className="date">
        Date Stolen :{" "}
        {new Date(item?.date_stolen * 1000)
         .toISOString()
          .split("T")[0]
          .replace(/-/g, "/")}
      </h4>
      <h4 className="record">
        Date of recording the stolen : anonymous
      </h4>
      <h4 className="location">
      
        Location of theft : {item?.stolen_location}
      </h4>
    </div>
    <div className="card-photo">
      {item.large_img ? (
        <img src={item.large_img} alt="bike imag" />
      ) : (
        <img
          src={
            "data:image/png;base64,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"
          }
          alt=""
        />
      )}
    </div>
  </div>
  )
}

export default Bike