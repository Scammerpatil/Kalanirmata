"use client";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import ToastContainer from "@/components/common/ToastContainer";
import AddSubjectForm from "@/components/tabs/Subjects/AddSubject";
import UpdateSubject from "@/components/tabs/Subjects/UpdateSubject";
import DeleteSubject from "@/components/tabs/Subjects/DeleteSubject";

const ManageSubjects = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<SubjectsComponent />} />
    </>
  );
};
export default ManageSubjects;

const SubjectsComponent = () => {
  return (
    <>
      <ToastContainer />
      <div role="tablist" className="tabs tabs-lifted w-min-[50vw] text-base">
        {/* Add Subject Tab */}
        <input
          type="radio"
          name="subject_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Add Subject"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96 "
        >
          <AddSubjectForm />
        </div>

        {/* Update Subject Tab */}
        <input
          type="radio"
          name="subject_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Update Subject"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96 "
        >
          <UpdateSubject />
        </div>

        {/* Delete Subject Tab */}
        <input
          type="radio"
          name="subject_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--a)] [--tab-border-color:var(--b1)]"
          aria-label="Delete Subject"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96"
        >
          <DeleteSubject />
        </div>
      </div>
    </>
  );
};
