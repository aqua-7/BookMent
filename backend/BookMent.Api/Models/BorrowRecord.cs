public class BorrowRecord
{
    public int Id { get; set; }

    public int BookId { get; set; }
    public Book? Book { get; set; }

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }

    public DateTime BorrowedAt { get; set; } = DateTime.UtcNow;
    public DateTime DueAt { get; set; }
    public DateTime? ReturnedAt { get; set; }

    public bool IsReturned => ReturnedAt.HasValue;
}
