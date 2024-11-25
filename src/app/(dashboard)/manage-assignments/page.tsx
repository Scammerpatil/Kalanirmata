"use client";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import ToastContainer from "@/components/common/ToastContainer";
import AssignTeacher from "./AddAssignment";
import UpdateAssigment from "./UpdateAssigment";
import DeleteAssigment from "./DeleteAssignment";

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
        {/* Add Assignment Tab */}
        <input
          type="radio"
          name="subject_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Add Assignment"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96 "
        >
          <AssignTeacher />
        </div>

        {/* Update Subject Tab */}
        <input
          type="radio"
          name="subject_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Update Assignment"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96 "
        >
          <UpdateAssigment />
        </div>

        {/* Delete Subject Tab */}
        <input
          type="radio"
          name="subject_tabs"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--a)] [--tab-border-color:var(--b1)]"
          aria-label="Delete Assignment"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96"
        >
          <DeleteAssigment />
        </div>
      </div>
    </>
  );
};
