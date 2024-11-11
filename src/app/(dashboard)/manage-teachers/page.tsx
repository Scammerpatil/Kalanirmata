"use client";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import AddTeacher from "@/components/tabs/Teachers/AddTeacher";
import UpdateTeacher from "@/components/tabs/Teachers/UpdateTeacher";
import DeleteTeacher from "@/components/tabs/Teachers/DeleteTeacher";

const Teachers = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<TeachersComponent />} />
    </>
  );
};

export default Teachers;

const TeachersComponent = () => {
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted w-min-[50vw] text-base">
        {/* Add Teacher Tab */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b2)]"
          aria-label="Add Teacher"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96 "
        >
          <AddTeacher />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--p)] [--tab-border-color:var(--b1)]"
          aria-label="Update Teacher"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96"
        >
          <UpdateTeacher />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg h-12 mx-10 [--tab-bg:var(--a)] [--tab-border-color:var(--b1)]"
          aria-label="Delete Teacher"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[--b2] border-[--b1] rounded-box p-6 min-h-96 "
        >
          <DeleteTeacher />
        </div>
      </div>
    </>
  );
};
