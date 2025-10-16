using System.ComponentModel.DataAnnotations;

public class Book
{
    public int Id { get; set; }

    [Required] public string Title { get; set; } = null!;
    public string? Author { get; set; }
    public string? ISBN { get; set; }
    public string? Genre { get; set; }
    public int? Year { get; set; }
    public string? Description { get; set; }

    public int TotalCopies { get; set; } = 1;
    public int CopiesAvailable { get; set; } = 1;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
