"""
Unit tests for AI Recommendation Engine
"""
from engine import compute_talent_match

def test_talent_match():
    candidate = {
        "id": "user-1",
        "name": "Christopher Nolan",
        "roles": ["DIRECTOR"],
        "skills": ["IMAX 70mm", "Practical Effects", "Nonlinear Storytelling"],
        "experienceYears": 22,
        "languages": ["English"],
        "location": "Los Angeles"
    }

    result = compute_talent_match(
        required_role="DIRECTOR",
        required_skills=["IMAX 70mm", "Practical Effects"],
        min_experience_years=10,
        required_languages=["English"],
        project_location="Los Angeles",
        is_remote_allowed=False,
        candidate=candidate
    )

    print("Test Result:", result)
    assert result["matchPercentage"] >= 95.0, f"Expected high score, got {result['matchPercentage']}"
    assert result["breakdown"]["roleCompatibility"] == 100
    assert result["breakdown"]["skillAlignment"] == 100
    print("AI Recommendation Engine verification passed!")

if __name__ == "__main__":
    test_talent_match()
