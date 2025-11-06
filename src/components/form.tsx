"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useLanguage } from "~/providers/language-provider";

interface FormProps {
  onSuccessChange?: (success: boolean) => void;
}

export default function WaitlistForm({ onSuccessChange }: FormProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.error(t("form.errors.feedbackRequired"));
      return;
    }

    if (!userEmail) {
      toast.error(t("form.errors.feedbackFailed"));
      return;
    }

    try {
      setFeedbackSubmitting(true);

      const response = await fetch("/api/notion", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          suggestedFeatures: feedback,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found in database");
        }
        throw new Error("Failed to save feedback");
      }

      setFeedbackSubmitted(true);
      toast.success(t("form.success.feedback"));
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(t("form.errors.feedbackFailed"));
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.email || !isValidEmail(formData.email)) {
        toast.error(t("form.errors.invalidEmail"));
        return;
      }

      setStep(2);
      return;
    }

    try {
      setLoading(true);

      const promise = new Promise((resolve, reject) => {
        const { name, email } = formData;

        fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        })
          .then((mailResponse) => {
            if (!mailResponse.ok) {
              if (mailResponse.status === 429) {
                reject("Rate limited");
              } else {
                reject("Email sending failed");
              }
              return null;
            }

            return fetch("/api/notion", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });
          })
          .then(async (notionResponse) => {
            if (!notionResponse) return;

            if (!notionResponse.ok) {
              if (notionResponse.status === 429) {
                reject("Rate limited");
              } else if (notionResponse.status === 409) {
                // Duplicate email error - use status code for reliable detection
                reject("DUPLICATE_EMAIL");
              } else {
                reject("Notion insertion failed");
              }
            } else {
              resolve({ name });
            }
          })
          .catch((error) => {
            reject(error);
          });
      });

      toast.promise(promise, {
        loading: t("form.loading"),
        success: (data) => {
          setUserEmail(formData.email);
          setFormData({ email: "", name: "" });
          setSuccess(true);
          onSuccessChange?.(true);
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
              ],
            });
          }, 100);
          return t("form.success.joined");
        },
        error: (error) => {
          // Handle duplicate email - reset form and go back to step 1
          if (error === "DUPLICATE_EMAIL" || error.includes("already on the waitlist") || error === "This email is already on the waitlist") {
            setFormData({ email: "", name: "" });
            setStep(1);
            return t("form.errors.alreadyOnWaitlist");
          }
          if (error === "Rate limited") {
            return t("form.errors.rateLimited");
          }
          if (error === "Email sending failed") {
            return t("form.errors.emailFailed");
          }
          if (error === "Notion insertion failed") {
            return t("form.errors.notionFailed");
          }
          return t("form.errors.generic");
        },
      });

      promise.finally(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full relative">
      {success ? (
        <motion.div
          className="flex flex-col gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              disabled
              className="bg-[#e5ff00] text-black px-6 py-2 rounded-[12] font-semibold opacity-75 cursor-not-allowed transition-all"
              type="button"
            >
              {t("form.joined")}
            </button>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-sm font-medium text-foreground text-center">
              {t("form.feedbackLabel")}
            </label>
            <form
              onSubmit={handleFeedbackSubmit}
              className="flex flex-col gap-3"
            >
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder={t("form.feedbackPlaceholder")}
                className="w-full bg-background border border-border text-foreground px-4 py-3 rounded-[12] focus:outline-1 transition-all duration-300 focus:outline-offset-4 focus:outline-[#e5ff00] resize-none min-h-[120px] placeholder:text-muted-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={feedbackSubmitting || feedbackSubmitted}
              />
              <button
                type={feedbackSubmitted ? "button" : "submit"}
                disabled={feedbackSubmitting || feedbackSubmitted}
                className={`w-full bg-[#e5ff00] text-black px-6 py-3 rounded-[12] font-semibold transition-all ${
                  feedbackSubmitted
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {feedbackSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <title>Loading spinner</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("form.submitting")}
                  </span>
                ) : feedbackSubmitted ? (
                  t("form.feedbackSubmitted")
                ) : (
                  t("form.submitFeedback")
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex relative"
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.emailPlaceholder")}
                  className="flex-grow bg-background border border-border text-foreground px-4 py-3 rounded-[12]  focus:outline-1 transition-all duration-300 focus:outline-offset-4 focus:outline-[#e5ff00]"
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 font-semibold top-0 bottom-0 bg-[#e5ff00] flex justify-center items-center cursor-pointer text-black px-5 py-2 m-2 rounded-[12] hover:bg-opacity-90 transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {t("form.continue")}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="name-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("form.namePlaceholder")}
                    className="flex-grow bg-background border border-border text-foreground px-4 py-3 rounded-[12]  focus:outline-1 transition-all duration-300 focus:outline-offset-4 focus:outline-[#e5ff00]"
                    disabled={loading}
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-0 font-semibold top-0 bottom-0 bg-[#e5ff00] flex justify-center items-center cursor-pointer text-black px-5 py-2 m-2 rounded-[12] hover:bg-opacity-90 transition-all disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <title>Loading spinner</title>
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t("form.joining")}
                      </span>
                    ) : (
                      <span>{t("form.joinWaitlist")}</span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
