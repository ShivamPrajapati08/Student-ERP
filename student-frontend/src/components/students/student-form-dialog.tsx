"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BranchCombobox } from "@/components/students/branch-combobox";
import { SectionCombobox } from "@/components/students/section-combobox";
import { Student, StudentInput } from "@/lib/api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStudent: Student | null;
  onSubmit: (data: StudentInput) => Promise<void>;
};

export function StudentFormDialog({
  open,
  onOpenChange,
  editingStudent,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setBranch(editingStudent.branch);
      setSection(editingStudent.section ?? "");
    } else {
      setName("");
      setBranch("");
      setSection("");
    }
  }, [editingStudent, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branch || !section) return;
    setSubmitting(true);
    try {
      await onSubmit({ name, branch, section });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingStudent ? "Edit Student" : "Add Student"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Akash Kumar"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Branch</Label>
            <BranchCombobox value={branch} onChange={setBranch} />
          </div>
          <div className="space-y-2">
            <Label>Section</Label>
            <SectionCombobox value={section} onChange={setSection} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting || !branch || !section}
            >
              {submitting
                ? "Saving..."
                : editingStudent
                ? "Update"
                : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}