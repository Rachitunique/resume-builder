//finalize me hamara sara data store se utha kar firestore pe store kar denge
import React from "react";
import ResumePreview from './resumePreview'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';
import { useFirestore } from 'react-redux-firebase'
function Finalize(props) {
  const firestore = useFirestore();
  let educationSection = props.educationSection
  let contactSection = props.contactSection
  let documentd = props.document

  const saveToDatabase = async () => {
    let user = await firestore.collection('users').doc(props.auth.uid).get();
    user = user.data();
    let newObj = null;
    if (user.resumeIds != undefined) {
      //agar resumeIds pahle se present hai to usme nya documentid add karenge
      newObj = { ...user.resumeIds, [documentd.id]: { educationSection: educationSection, contactSection: contactSection, document: documentd } }
    }
    else {
      //nhi to nhi document id define ho rha hai resumeid me
      newObj = { [documentd.id]: { educationSection: educationSection, contactSection: contactSection, document: documentd } }
    }
    await firestore.collection('users').doc(props.auth.uid).update({
      resumeIds: newObj
    })
  }
  const downloadResume = () => {
    //resumepreview ka photo click kar leta hai canvas aur phir usko pdf me change karta hai
    const input = document.getElementById('resumePreview');
    console.log(document)
    html2canvas(input)
      .then((canvas) => {
        //image png ke form me convert kiya
        const imgData = canvas.toDataURL('image/png');
        //hame image potray me chahiye,uske dimentions mm me honge aur hame a4 size ki chahiye
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        //imagea ko pdf me daal diya
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save("resume.pdf");
      }).catch(function (error) {
        console.log(error)
      })
  }
  return (
    <div className="container full finalize-page" >
      <div className="funnel-section ">
        <div className="finalize-preview-card " id="resumePreview">
          <ResumePreview contactSection={contactSection} educationSection={educationSection} skinCd={props?.document?.skinCd}></ResumePreview>
        </div>
        <div className="finalize-settings center">


          <div className=" download-resume resume-options">
            <p className="no-margin"  >
              Download Resume As PdF
            </p>
            <a style={{ cursor: 'pointer' }} onClick={downloadResume}  >download Resume</a>
          </div>
          <div className=" download-resume resume-options">
            <p className="no-margin"  >
              Save to Database
            </p>
            <a style={{ cursor: 'pointer' }} onClick={saveToDatabase}  >Save to Database</a>
          </div>
        </div>
      </div>
    </div>
  )


}
const mapStateToProps = state => {
  return {
    contactSection: state.contactSection,
    educationSection: state.educationSection,
    document: state.document,
    //fire ka auth uid access karne ke liye chahiye
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps, null)(Finalize)